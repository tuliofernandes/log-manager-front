import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
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

function ViewLogs(): React.ReactNode {
  const [logs, setLogs] = useState<ILog[]>([]);

  const fetchLogs = async () => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = "1970-01-01";

    try {
      const response = await axios.get("http://localhost:3000/logs", {
        params: {
          start_date: startDate,
          end_date: endDate,
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
