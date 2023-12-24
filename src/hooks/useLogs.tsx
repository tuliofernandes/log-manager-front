import { useQuery } from "react-query";
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

const fetchLogs = async (
  startDate: Date,
  endDate: Date,
  messagePattern: string
) => {
  const response = await api.get<Log[]>("/logs", {
    params: {
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      message_pattern: messagePattern === "" ? undefined : messagePattern,
    },
  });

  return response.data;
};

const useLogs = (startDate: Date, endDate: Date, messagePattern: string) => {
  return useQuery<Log[], Error>(
    ["logs", startDate, endDate, messagePattern],
    () => fetchLogs(startDate, endDate, messagePattern)
  );
};

export default useLogs;
