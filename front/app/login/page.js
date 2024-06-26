'use client'
/*import validation from "./validations";
import { useTheme } from "../../Theme/Themecontext";
import { useNavigate } from "react-router";
*/
import Link from "next/link";
import { useSelector } from "react-redux";
import es from "@/public/es";
import en from "@/public/en";


const Login = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  return (
    <div className="pt-8 bg-gradient-to-br h-screen from-gray-900 to-gray-800 text-white rounded-lg overflow-hidden">
      <div className="pt-16">
        <p className="text-4xl font-semibold text-center">{texts.LoginWelcome} </p>
      </div>
      <div className="py-8">
        <p className="text-lg text-center">
          {texts.LoginWelcomeText}
        </p>
      </div>
      <div>
        <div>
          <form className="w-full max-w-md mx-auto px-4">
            <input
              className="w-full mb-4 px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700"
              placeholder="Email Address"
              size="S"
              label="Email Address"
            />
            {/* errors.email && (
                  <p className="text-xs text-error-500">{errors.email}</p>
                ) */}
            <input
              className="w-full mb-4 px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700"
              placeholder="Password"
              size="S"
              label="Password"
              type="password"
            />
            {/* errors.password && (
                  <p className="text-xs text-error-500">{errors.password}</p>
                ) */}

            <p className="text-sm text-gray-400 text-right mb-4 hover:text-blue-500 cursor-pointer">
             {texts.LoginForgot}
            </p>

            <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              {texts.LoginButton}
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="flex justify-center py-4">
          <p className="text-gray-400">{texts.LoginForgot} </p>
          <Link
            href={"/signup"}
            className="text-blue-400 font-bold cursor-pointer ml-2 hover:text-blue-500"
          >
            {texts.LoginNoAcc}
          </Link>
        </div>
      </div>
      {/* <div className="fixed bottom-4 left-4 cursor-pointer z-50">
            { theme === "dark" ? (
              <span onClick={toggleTheme}>Sun Icon</span>
            ) : (
              <span onClick={toggleTheme}>Moon Icon</span>
            ) }
          </div> */}
    </div>
  );
};

export default Login;
