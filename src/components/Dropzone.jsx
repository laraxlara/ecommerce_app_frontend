import { useDropzone } from "react-dropzone";

function Dropzone({ open, name, value, onChange, placeholder, onBlur }) {
  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input
        {...getInputProps()}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      <div className="text-center">
        <p className="dropzone-content">
          Dragndrop some files here, or click to select files
        </p>
      </div>
    </div>
  );
}

export default Dropzone;
