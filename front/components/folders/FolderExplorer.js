"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivos } from "@/redux/slices/archivoSlice";
import Button from "../UI/Button";

const FolderExplorer = () => {
  const dispatch = useDispatch();
  const archivos = useSelector((state) => state.archivo.archivo);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchArchivos());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="h-screen flex justify-center text-blue-200">
      <div>
        <h2>Archivo digital</h2>
        <input
          type="file"
          accept=".pdf, .jpeg, .jpg, .png, .txt, .las, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
          onChange={handleFileChange}
        />
        <div className="preview-container">
          {selectedFile && (
            <>
              <h3>Previsualización:</h3>
              {selectedFile.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
              ) : (
                <p>No se puede previsualizar este tipo de archivo.</p>
              )}
            </>
          )}
        </div>
        <h3 className="pt-4">Archivos Seleccionados:</h3>
        {/*<ul>
          {archivos.map((file, index) => (
            <li key={index}>
              <embed src={file.ruta} width="800" height="500" />
              <div className="flex justify-center p-4">
                <Button
                  onClick={() => {
                    // Crea un enlace temporal para el archivo y haz clic en él para iniciar la descarga
                    const downloadLink = document.createElement("a");
                    downloadLink.href = file.ruta;
                    downloadLink.download = `archivo${index}.${file.nombre
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
        </ul>*/}
      </div>
    </div>
  );
};

export default FolderExplorer;
