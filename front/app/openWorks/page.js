import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-24 flex justify-around">
      <Link className="text-yellow-500" href={"/openWorks/wellHeaders"}>
        Well header
      </Link>
      <Link className="text-yellow-500" href={"/openWorks/survey"}>
        Survey
      </Link>
      <Link className="text-yellow-500" href={"/openWorks/logcurve"}>
        Log curve
      </Link>
      <p>Surface picks</p>
    </div>
  );
};

export default page;
