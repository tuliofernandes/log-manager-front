import { useQuery } from "react-query";
import axios from "axios";

interface ILog {
  logId: number;
  ip: string;
  datetime: string;
  type: string;
  version: string;
  title: string;
  description: string;
}

const fetchLogs = async (
  startDate: Date,
  endDate: Date,
  messagePattern: string
) => {
  const queryUrl = `${import.meta.env.API_URL}/logs`;
  const response = await axios.get(queryUrl, {
    params: {
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      message_pattern: messagePattern === "" ? undefined : messagePattern,
    },
  });

  return response.data;
};

const useLogs = (startDate: Date, endDate: Date, messagePattern: string) => {
  return useQuery<ILog[], Error>(
    ["logs", startDate, endDate, messagePattern],
    () => fetchLogs(startDate, endDate, messagePattern)
  );
};

export default useLogs;
