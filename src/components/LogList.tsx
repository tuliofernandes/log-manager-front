import { Table } from "react-bootstrap";

interface LogListProps {
  logs: Log[];
  isLoading: boolean;
}

const LogList: React.FC<LogListProps> = ({ logs, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
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
      )}
    </>
  );
};

export default LogList;
