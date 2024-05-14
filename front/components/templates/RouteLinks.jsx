"use client";
import { SectionWrapper } from "@/hoc";
import HomeLinks from "./HomeLinks";

const RouteLinks = () => {
  return (
    <div>
      <div className="flex justify-around w-full mb-8 flex-col pt-8">
        <div className="flex flex-col">
          <div className="flex pt-8">
            <HomeLinks
              buttonTitle="Ver Dashboard"
              pText=" ¡Explora nuestra base de usuarios y descubre información fascinante
        sobre quienes interactúan con nuestra plataforma! Nuestra sección de
        te ofrece una ventana hacia la diversidad y el
         "
              position
              fadeSide="left"
              where="/dashboard"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle="Ver mapas"
              pText="¡Descubre nuestro fascinante mundo de mapas interactivos! Nuestra
        sección de  te invita a explorar territoriostesoro de conocimiento que puede inspirar ideas innovadoras y
        decisiones informadas. ¿Estás listo para descubrir las historias qu
    "
              fadeSide="left"
              position
              where="/mapas"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle="Ver Archivo digital"
              pText=" ¡Explora nuestra amplia colección de datos y recursos fundamentales
        en nuestra sección de  Desde bases de datos científicas
       r ón profunda y perspicaz sobre una amplia gama de temas. Desde
        datos demográficos hasta tendencias de mercado, nuestra plataforma"
              position
              fadeSide="left"
              where="/archivodigital"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle="OpenWorks"
              pText=" ¡Sumérgete en el fascinante mundo de los datos con nuestra sección
        de Ver Datos! Explora conjuntos de datos detallados, gráficos
        informativos y estadísticas impactantes que te proporcionarán una
        visi
        te ofrece una ventana hacia el panorama completo de información
        relevante y actualizada. Con un simple clic, podrás acceder a un
        e
        los datos tienen para contarte? ¡Haz clic ahora para explorar Ver
        Datos!"
              fadeSide="left"
              position
              where="/openWorks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(RouteLinks);
