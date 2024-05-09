"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivos } from "@/redux/slices/archivoSlice";
import Button from "../UI/Button";
import Link from "next/link";

const FolderExplorer = () => {
  const dispatch = useDispatch();
  const archivos = useSelector((state) => state.archivo.archivo);
  const [searchTermNombre, setSearchTermNombre] = useState("");
  const [searchTermRuta, setSearchTermRuta] = useState("");

  useEffect(() => {
    dispatch(fetchArchivos());
  }, [dispatch]);

  const handleSearchTermNombreChange = (event) => {
    setSearchTermNombre(event.target.value);
  };

  const handleSearchTermRutaChange = (event) => {
    setSearchTermRuta(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const filteredArchivos = archivos.filter(
    (archivo) =>
      archivo.nombre.toLowerCase().includes(searchTermNombre.toLowerCase()) &&
      archivo.ruta.toLowerCase().includes(searchTermRuta.toLowerCase())
  );

  return (
    <div className="p-24">
      <div className="text-white">
        <h2>Archivo digital</h2>
        <input
          type="file"
          multiple
          accept=".pdf, .jpeg, .jpg, .png, .txt, .csv, .las, .doc, .xls, .xlsx, application/pdf, image/jpeg, image/png, text/plain, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/*, */*"
          onChange={handleFileChange}
        />
        <h3 className="pt-4">Archivos Seleccionados:</h3>
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
      <input
        type="text"
        placeholder="Buscar por nombre de archivo..."
        value={searchTermNombre}
        onChange={handleSearchTermNombreChange}
        className="border border-gray-300 rounded px-3 py-1 mb-4"
      />
      <input
        type="text"
        placeholder="Buscar por ruta..."
        value={searchTermRuta}
        onChange={handleSearchTermRutaChange}
        className="border border-gray-300 rounded px-3 py-1 mb-4"
      />
      {filteredArchivos.map((archivo, i) => (
        <div key={i} className="text-white p-4">
          <p>{archivo.nombre}</p>
          <Link href={archivo.ruta}>{archivo.ruta}</Link>
        </div>
      ))}
    </div>
  );
};

export default FolderExplorer;
