import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import QueryForm from "../components/QueryForm";
import LogList from "../components/LogList";
import Pagination from "../components/Pagination";

export interface ILog {
  logId: number;
  ip: string;
  datetime: string;
  type: string;
  version: string;
  title: string;
  description: string;
}

const ViewLogs: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date("2016-01-01"));
  const [endDate, setEndDate] = useState(new Date(new Date()));
  const [messagePattern, setMessagePattern] = useState("");
  const [logs, setLogs] = useState<ILog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 50;

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/logs", {
        params: {
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
          message_pattern: messagePattern === "" ? undefined : messagePattern,
        },
      });

      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [startDate, endDate, messagePattern]);

  useEffect(() => {
    if (logs.length === 0) {
      fetchLogs();
    }
  }, [logs, setLogs, fetchLogs]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(logs.length / logsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>View Logs</h2>
      <QueryForm
        messagePattern={messagePattern}
        startDate={startDate}
        endDate={endDate}
        onMessagePatternChange={setMessagePattern}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFetchLogs={fetchLogs}
      />
      <LogList logs={currentLogs} />
      <Pagination
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewLogs;
