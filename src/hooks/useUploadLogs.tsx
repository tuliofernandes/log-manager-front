import { useMutation } from "react-query";

import { api } from "../api";

const uploadLogs = async (files: FileList) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/logs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const useLogUpload = () => {
  return useMutation(uploadLogs);
};

export default useLogUpload;
