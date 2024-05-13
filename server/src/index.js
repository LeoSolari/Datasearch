const express = require("express");

require("dotenv").config();

const cors = require("cors");

const wellRoutes = require("../src/services/openworks/routes/well.route.js");

const surveyRoutes = require("../src/services/openworks/routes/survey.route.js");

const logCurveRoutes = require("../src/services/openworks/routes/logCurve.route.js");

const archivoRoutes = require("./services/archivoDigital/archivo.route.js");

const userRoutes = require("./routes/users.routes.js");

const indexRoutes = require("./routes/index.routes.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Permitir solicitudes solo desde este origen
  })
);

// Montado de rutas

//rutas sql
app.use("/api", indexRoutes);
app.use("/api", userRoutes);

// rutas sqlite wells

app.use("/api/wells", wellRoutes);

// Ruta surveys

app.use("/api/surveys", surveyRoutes);

// Ruta logCurves

app.use("/api/logCurve", logCurveRoutes);

// Ruta para obtener los archivos de la carpeta

app.use("/api/archivos", archivoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/*
const fs = require("fs");
const path = require("path");

const folderPath = "/Users/54226/Desktop/PAMI";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error al leer la carpeta:", err);
    return;
  }

  console.log("Contenido de la carpeta PAMI:");
  files.forEach((file) => {
    console.log(file);
  });
});
*/
