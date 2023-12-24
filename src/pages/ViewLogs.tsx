import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import QueryForm from "../components/QueryForm";
import LogList from "../components/LogList";
import Pagination from "../components/Pagination";

import useLogs from "../hooks/useLogs";

const ViewLogs: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date("2016-01-01"));
  const [endDate, setEndDate] = useState(new Date(new Date()));
  const [messagePattern, setMessagePattern] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 15;
  const pageNumbers: number[] = [];

  const { data: logs, refetch } = useLogs(startDate, endDate, messagePattern);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs ? logs.slice(indexOfFirstLog, indexOfLastLog) : [];

  for (let i = 1; i <= Math.ceil((logs?.length ?? 0) / logsPerPage); i++) {
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
        onFetchLogs={refetch}
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
