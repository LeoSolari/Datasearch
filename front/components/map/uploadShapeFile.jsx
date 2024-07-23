import React, { useState } from 'react';

const UploadShapefile = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [filePath, setFilePath] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setFilePath(data.filePath);
      setError(null);
      onUpload(data.filePath); // Llama a onUpload con la URL del archivo
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filePath && <p>File uploaded successfully: <a href={filePath} target="_blank" rel="noopener noreferrer">{filePath}</a></p>}
    </div>
  );
};


export default UploadShapefile;
