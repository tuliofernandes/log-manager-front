interface FileInputProps {
  onChange: (files: FileList | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files);
  };

  return (
    <input
      type="file"
      accept=".log,.csv"
      multiple
      onChange={handleFileChange}
    />
  );
};

export default FileInput;
