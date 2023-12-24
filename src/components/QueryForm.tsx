import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface QueryFormProps {
  messagePattern: string;
  startDate: Date;
  endDate: Date;
  onMessagePatternChange: (value: string) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onFetchLogs: () => void;
}

const QueryForm: React.FC<QueryFormProps> = ({
  messagePattern,
  startDate,
  endDate,
  onMessagePatternChange,
  onStartDateChange,
  onEndDateChange,
  onFetchLogs,
}) => {
  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search in description"
        value={messagePattern}
        onChange={(e) => onMessagePatternChange(e.target.value)}
      />
      <DatePicker selected={startDate} onChange={onStartDateChange} />
      <DatePicker selected={endDate} onChange={onEndDateChange} />
      <Button onClick={onFetchLogs}>Refresh</Button>
    </div>
  );
};

export default QueryForm;
