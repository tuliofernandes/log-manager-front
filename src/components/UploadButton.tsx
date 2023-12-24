interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Upload</button>;
};

export default UploadButton;
