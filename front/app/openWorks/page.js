import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <Link href={"/openWorks/wellHeaders"}>
          <p className="inline-block w-48 bg-yellow-500 text-white text-xl py-3 px-6 rounded hover:bg-yellow-600 text-center">
            Well header
          </p>
        </Link>
        <Link href={"/openWorks/survey"}>
          <p className="inline-block w-48 bg-yellow-500 text-white text-xl py-3 px-6 rounded hover:bg-yellow-600 text-center">
            Survey
          </p>
        </Link>
        <Link href={"/openWorks/logcurve"}>
          <p className="inline-block w-48 bg-yellow-500 text-white text-xl py-3 px-6 rounded hover:bg-yellow-600 text-center">
            Log curve
          </p>
        </Link>
        <p className="text-yellow-500 text-xl">Surface picks</p>
      </div>
    </div>
  );
};

export default Page;
