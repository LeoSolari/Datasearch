import React from "react";
import webimg from "../../images/web.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <div className="app__wrapper section__padding bg-black  " id="home">
      <div className="app__wrapper_info">
        <h1 className="tracking-wider uppercase leading-9 md:leading-[117px] text-[40px] md:text-[90px] font-['Cormorant_Upright'] text-[var(--color-golden)] ">
          Bienvenido a nuestro portal
        </h1>
        <p className="p__opensans my-[2rem]">
          Explora la página y contáctanos si tienes alguna pregunta. Siéntete
          libre de comunicarte con nosotros para obtener más información.
        </p>
        <button
          type="button"
          className="custom__button bg-[var(--color-crimson)] "
        >
          Explora nuestra web
        </button>
      </div>
      <div className="app__wrapper_img">
        {/* <Image src={webimg} alt="Header img" /> */}
        <p className="text-white">Placeholder</p>
      </div>
    </div>
  );
};

export default Header;
