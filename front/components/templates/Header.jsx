import React from "react";
import es from "@/public/es";
import en from "@/public/en";
import {useSelector } from "react-redux";

const Header = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  const redirectionLink = () => {
    window.open("https://phoenixglobalresources.com/", "_blank")
  }

  return (
    <div className="pt-24 pb-4 w-full text-center  " id="home">
      <div >
        <h1 className="tracking-wider uppercase pb-4 leading-9 md:leading-[65px] text-[35px] md:text-[60px] font-['Cormorant_Upright'] text-[var(--color-golden)] ">
          {texts.HeaderTitle}
        </h1>
      
        <button
          type="button"
          className="custom__button bg-[var(--color-crimson)] "
          onClick={redirectionLink}
        >
          {texts.HeaderButton}
        </button>
      </div>
      
    </div>
  );
};

export default Header;
