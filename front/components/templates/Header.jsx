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
    <div className="app__wrapper section__padding bg-black w-full text-center  " id="home">
      <div >
        <h1 className="tracking-wider uppercase leading-9 md:leading-[117px] text-[40px] md:text-[90px] font-['Cormorant_Upright'] text-[var(--color-golden)] ">
          {texts.HeaderTitle}
        </h1>
        <p className="p__opensans my-[2rem]">
        {texts.HeaderText}
        </p>
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
