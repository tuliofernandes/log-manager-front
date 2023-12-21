import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
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

  const fetchLogs = async () => {
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
  };

  useEffect(() => {
    if (logs.length === 0) {
      fetchLogs();
    }
  }, [logs]);

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
          {logs.map((log) => (
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
    </div>
  );
}

export default ViewLogs;
