import Link from "next/link";
import es from "@/public/es";
import en from "@/public/en";
import {useSelector } from "react-redux";

const Footer = () => {
  
  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  return (
    <div className=" w-full">
      <footer className="bg-slate-300 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
        <div className="bg-slate-400 p-6 text-center dark:bg-neutral-700 flex justify-center">
          <span className="p-1">© 2024 Copyright:</span>
          <p className="flex items-center justify-center p__raleway font-semibold text-neutral-600 dark:text-neutral-400">
            DataBats
          </p>
          <Link href="/terminos-y-condiciones" className="text-xs">
            <p>{texts.FooterTerms} </p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
