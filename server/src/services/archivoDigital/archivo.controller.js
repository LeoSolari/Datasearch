const fs = require("fs").promises;
const path = require("path");

async function obtenerContenido(folderPath) {
  const contenido = [];
  const stack = [folderPath];

  while (stack.length > 0) {
    const currentPath = stack.pop();
    const currentFiles = await fs.readdir(currentPath, { withFileTypes: true });

    for (const file of currentFiles) {
      const filePath = path.join(currentPath, file.name);
      if (file.isDirectory()) {
        stack.push(filePath);
      }
      contenido.push({ nombre: file.name, ruta: filePath });
    }
  }

  return contenido;
}

module.exports = {
  obtenerContenido,
};
