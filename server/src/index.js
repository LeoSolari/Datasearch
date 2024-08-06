const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const JSZip = require('jszip');
require("dotenv").config();

// Importar las rutas existentes
const wellRoutes = require("../src/services/openworks/routes/well.route.js");
const surveyRoutes = require("../src/services/openworks/routes/survey.route.js");
const surveyHdrRoutes = require("../src/services/openworks/routes/surveyHdr.route.js");
const logCurveRoutes = require("../src/services/openworks/routes/logCurve.route.js");
const mnemonicgroupmemberRoutes = require("../src/services/openworks/routes/mnemonicgroupmember.route.js");
const surfacePicksRoutes = require("../src/services/openworks/routes/surfacePicks.route.js");
const surfNameRoutes = require("../src/services/openworks/routes/surfName.route.js");
const crvNameRoutes = require("../src/services/openworks/routes/crvName.route.js");
const archivoRoutes = require("./services/archivoDigital/archivo.route.js");
const userRoutes = require("./routes/users.routes.js");
const combinedPicksRoutes = require("../src/services/openworks/routes/combinedPicks.route");
const indexRoutes = require("./routes/index.routes.js");
const seisRoutes = require('../src/services/openworks/routes/seisData.route.js');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'shapefiles');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Verifica que el archivo es un ZIP
  if (path.extname(req.file.originalname) !== '.zip') {
    return res.status(400).json({ error: 'Only ZIP files are allowed.' });
  }

  try {
    const filePath = path.join(__dirname, 'public', 'shapefiles', req.file.filename);
    const zip = new JSZip();
    const data = fs.readFileSync(filePath);
    const zipData = await zip.loadAsync(data);

    // Verificar la existencia de los archivos shapefile en el ZIP
    const shapefile = zipData.file('shapetest.shp');
    const shxfile = zipData.file('shapetest.shx');
    const dbffile = zipData.file('shapetest.dbf');

    if (!shapefile || !shxfile || !dbffile) {
      return res.status(400).json({ error: 'Missing shapefile components.' });
    }

    // Procesar los archivos shapefile aquí si es necesario

    res.json({ filePath: `/shapefiles/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: 'Error processing file.' });
  }
});

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Montado de rutas existentes
app.use("/api", indexRoutes);
app.use("/api", userRoutes);
app.use("/api/wells", wellRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/surveyhdr", surveyHdrRoutes);
app.use("/api/logCurve", logCurveRoutes);
app.use("/api/surfName", surfNameRoutes);
app.use("/api", combinedPicksRoutes);
app.use("/api/picks", surfacePicksRoutes);
app.use("/api/mnemonicgroupmember", mnemonicgroupmemberRoutes);
app.use("/api/crvNames", crvNameRoutes);
app.use("/api/archivos", archivoRoutes);
app.use('/api', seisRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
