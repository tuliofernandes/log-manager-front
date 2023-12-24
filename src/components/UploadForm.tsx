import { useEffect, useState } from "react";

import useLogUpload from "../hooks/useUploadLogs";
import FileInput from "./FileInput";
import UploadButton from "./UploadButton";

const UploadForm: React.FC = () => {
  const { mutate, isLoading, error } = useLogUpload();
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (files: FileList | null) => {
    setFiles(files);
  };

  const handleUpload = () => {
    if (files) mutate(files);
  };

  useEffect(() => {
    if (error) alert((error as Error).message);
  }, [error]);

  return (
    <>
      {isLoading ? (
        <div>Uploading...</div>
      ) : (
        <>
          <h2>Upload Logs</h2>
          <FileInput onChange={handleFileChange} />
          <UploadButton onClick={handleUpload} />
        </>
      )}
    </>
  );
};

export default UploadForm;
