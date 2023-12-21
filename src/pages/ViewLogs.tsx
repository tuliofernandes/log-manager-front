import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

interface ILog {
  logId: number;
  ip: string;
  datetime: string;
  type: string;
  version: string;
  title: string;
  description: string;
}

function ViewLogs(): React.ReactNode {
  const [startDate, setStartDate] = useState(new Date("2016-01-01"));
  const [endDate, setEndDate] = useState(new Date(new Date()));
  const [logs, setLogs] = useState<ILog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 50;

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/logs", {
        params: {
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        },
      });

      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [startDate, endDate]);

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

  const start = Math.max(currentPage - 5, 0);
  const end = Math.min(start + 30, pageNumbers.length);
  const visiblePageNumbers = pageNumbers.slice(start, end);

  return (
    <div>
      <h2>View Logs</h2>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
      />
      <Button onClick={fetchLogs}>Refresh</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>IP</th>
            <th>Datetime</th>
            <th>Type</th>
            <th>Version</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log) => (
            <tr key={log.logId}>
              <td>{log.logId}</td>
              <td>{log.ip}</td>
              <td>{new Date(log.datetime).toLocaleString()}</td>
              <td>{log.type}</td>
              <td>{log.version}</td>
              <td>{log.title}</td>
              <td>{log.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}
      >
        <Pagination.Prev
          onClick={() => setCurrentPage((old) => Math.max(1, old - 1))}
        />
        {visiblePageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((old) => Math.min(pageNumbers.length, old + 1))
          }
        />
      </Pagination>
    </div>
  );
}

export default ViewLogs;
