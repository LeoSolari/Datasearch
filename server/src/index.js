const express = require("express");
const wellRoutes = require("../sqlite/routes/well.route.js");

const userRoutes = require("./routes/users.routes.js");
const indexRoutes = require("./routes/index.routes.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Permitir solicitudes solo desde este origen
  })
);

// Montado de rutas

//rutas sql
app.use("/api", indexRoutes);
app.use("/api", userRoutes);

// rutas sqlite

app.use("/api/wells", wellRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
