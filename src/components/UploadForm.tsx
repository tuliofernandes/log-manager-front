import { useState } from "react";
import axios from "axios";
import FileInput from "./FileInput";
import UploadButton from "./UploadButton";

const UploadForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (files: FileList | null) => {
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(
          "http://localhost:3000/logs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        // Adicione lógica para exibir mensagem de sucesso, se necessário
      } catch (error) {
        console.error(error);
        // Adicione lógica para exibir mensagem de erro, se necessário
      }
    }
  };

  return (
    <div>
      <h2>Upload Logs</h2>
      <FileInput onChange={handleFileChange} />
      <UploadButton onClick={handleUpload} />
    </div>
  );
};

export default UploadForm;
