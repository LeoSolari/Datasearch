"use client";
import React, { useState } from "react";
import Button from "../Button";

const FolderExplorer = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h2>Seleccionar Archivos</h2>
        <input
          type="file"
          multiple
          accept=".pdf, .jpeg, .jpg, .png, .txt"
          onChange={handleFileChange}
        />
        <h3>Archivos Seleccionados:</h3>
        <ul>
          {Array.from(selectedFiles).map((file, index) => (
            <li key={index}>
              <embed src={URL.createObjectURL(file)} width="800" height="500" />

              <div className="flex justify-center p-4">
                <Button
                  onClick={() => {
                    // Crea un enlace temporal para el archivo y haz clic en él para iniciar la descarga
                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(file);
                    downloadLink.download = `archivo${index}.${file.name
                      .split(".")
                      .pop()}`;
                    downloadLink.click();
                  }}
                  className="download-btn"
                  height={65}
                  width={300}
                >
                  Descargar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderExplorer;
