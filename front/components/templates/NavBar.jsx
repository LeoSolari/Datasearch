'use client'
import Link from "next/link";
import logo from "../../images/logophoenix.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "@/redux/slices/languageSlice";
import es from "@/public/es";
import en from "@/public/en";

const Navbar = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)
  const dispatch = useDispatch()

  const texts = isSpanish ? es : en

  const links = [
    { text: texts.NavbarLogin, ref: "/login" },
    { text: texts.NavbarSignin, ref: "/signup" },
  ];

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-blue-950 text-white py-4 px-8 ">
      <div className="flex justify-between items-center">
        <div className="w-1/2 sm:w-3/4 lg:w-auto">
          <Link className="w-fit" href="/">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        <button onClick={handleToggleLanguage}>
          {isSpanish ? 'Switch to English' : 'Cambiar a Español'}
        </button>

        <div className="flex space-x-4">
         { /* <div className="flex space-x-4">
            {links.map((link, index) => (
              <Link href={link.ref} key={index}>
                <p className="hover:text-blue-300">{link.text}</p>
              </Link>
            ))}
          </div>*/}
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
