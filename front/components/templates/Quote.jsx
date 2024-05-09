import React from "react";
import QuoteImg from "../../images/quotes.png";
import TeslaImg from "../../images/tesla.png";
import Image from "next/image";

const Quote = () => {
  return (
    <div className="app__bg app__wrapper section__padding">
      <div className="app__wrapper_img app__wrapper_img-reverse">
        <Image src={TeslaImg} alt="Tesla" />
      </div>
      <div className="app__wrapper_info">
        <h1 className="headtext__cormorant text-center">En lo que creemos</h1>
        <div className="flex flex-col w-full mt-[5rem] ">
          <div className="flex justify-start items-end">
            <Image
              className="w-[15px] h-[18px] sm:w-[47px] sm:h-[40px] mr-[1rem] mb-[1rem] "
              src={QuoteImg}
              alt="Quote"
            />
            <div className="flex-col md:flex-row">
              <p className="p__opensans p-1">
                Descubre una aplicación que redefine la simplicidad y la
                intuición. Nuestra nueva aplicación está diseñada para ser fácil
                de usar y entender, proporcionando una experiencia fluida y sin
                complicaciones para todos los usuarios. ¡Explora y disfruta de
                la comodidad de una interfaz intuitiva que te guiará sin
                esfuerzo a través de todas tus tareas
              </p>
              <p className="p__opensans p-1">
                Nuestra aplicación está diseñada para ofrecer búsquedas rápidas
                y accesibilidad. Con la velocidad de búsqueda optimizada y una
                interfaz intuitiva, realizarás tus tareas de manera más
                eficiente que nunca. Simplifica tu trabajo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Quote;
