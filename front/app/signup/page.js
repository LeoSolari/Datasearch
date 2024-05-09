import React from "react";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="bg-gradient-to-br pt-8 h-screen from-gray-900 to-gray-800 text-white rounded-lg overflow-hidden">
      <div className="pt-16">
        <p className="text-4xl font-semibold text-center">Crea una Cuenta!</p>
      </div>
      <div className="py-8">
        <p className="text-lg text-center">
          Crea tu cuenta y ve los beneficios exclusivos que puedes desbloquear
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

            <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="flex justify-center py-4">
          <p className="text-gray-400">Ya tienes una cuenta?</p>
          <Link
            href={"/login"}
            className="text-blue-400 font-bold cursor-pointer ml-2 hover:text-blue-500"
          >
            Ingresar
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

export default SignUp;
