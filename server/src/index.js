const express = require("express");

require("dotenv").config();

const cors = require("cors");

const wellRoutes = require("../src/services/openworks/routes/well.route.js");

const surveyRoutes = require("../src/services/openworks/routes/survey.route.js");

const surveyHdrRoutes = require("../src/services/openworks/routes/surveyHdr.route.js");

const logCurveRoutes = require("../src/services/openworks/routes/logCurve.route.js");

const mnemonicgroupmemberRoutes = require("../src/services/openworks/routes/mnemonicgroupmember.route.js");

const surfacePicksRoutes = require("../src/services/openworks/routes/surfacePicks.route.js")

const archivoRoutes = require("./services/archivoDigital/archivo.route.js");

const userRoutes = require("./routes/users.routes.js");

const indexRoutes = require("./routes/index.routes.js");

const app = express();
app.use(express.json());
app.use(cors());

// Montado de rutas

//rutas sql
app.use("/api", indexRoutes);
app.use("/api", userRoutes);

// rutas sqlite wells

app.use("/api/wells", wellRoutes);

// Ruta surveys

app.use("/api/surveys", surveyRoutes);

//

app.use("/api/surveyhdr", surveyHdrRoutes)

// Ruta logCurves

app.use("/api/logCurve", logCurveRoutes);

// 

app.use("/api/picks", surfacePicksRoutes);

//

app.use("/api/mnemonicgroupmember", mnemonicgroupmemberRoutes)

// Ruta para obtener los archivos de la carpeta

app.use("/api/archivos", archivoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
