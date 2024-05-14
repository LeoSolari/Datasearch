import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";

const Solution = () => {
  return (
    <div className="w-full text-white">
      <h1 className="headtext__cormorant text-center">
        ¿Qué venimos a solucionar?
      </h1>
      <motion.div
        variants={fadeIn("up", "tween", 0.4, 1.5)}
        className="flex flex-col lg:flex-row lg:justify-around p-12 text-center"
      >
        <div className="p-4">
          <h1 className="text-xl pb-4">Busqueda eficiente.</h1>
          <p className="text-left">
            Mejora la eficiencia de las consultas de búsqueda mediante la
            indexación adecuada de campos relevantes en la base de datos.
            Además, considera el uso de bases de datos NoSQL para consultas
            rápidas y escalables.
          </p>
        </div>
        <div className="p-4">
          <h1 className="text-xl pb-4">Informacion en un solo lugar</h1>
          <p className="text-left">
            Implementa un sistema de almacenamiento en caché para los resultados
            de búsqueda frecuentes. Esto reduce el tiempo de respuesta al
            mostrar resultados previamente solicitados, mejorando la velocidad
            de búsqueda para los usuarios.
          </p>
        </div>
        <div className="p-4">
          <h1 className="text-xl pb-4">Intuitiva y accesible</h1>
          <p className="text-left">
            Utiliza técnicas como la carga perezosa (lazy loading) o la
            paginación infinita para cargar resultados de búsqueda a medida que
            el usuario se desplaza por la página. Esto mejora la experiencia del
            usuario al evitar tiempos de espera prolongados durante la carga
            inicial de resultados.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Solution);
