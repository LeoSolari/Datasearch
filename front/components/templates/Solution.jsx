'use client'
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";
import { useSelector } from "react-redux";
import es from "@/public/es";
import en from "@/public/en";

const Solution = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  return (
    <div className="w-full text-white">
      <h1 className="headtext__cormorant text-center">
        {texts.SolutionTitle}
      </h1>
      <motion.div
        variants={fadeIn("up", "tween", 0.4, 1.5)}
        className="flex flex-col lg:flex-row lg:justify-around p-12 text-center"
      >
        <div className="px-4">
          <h1 className="text-xl pb-4">{texts.SolutionInfoTitle} </h1>
          <p className="text-left">
           {texts.SolutionInfoText}
          </p>
        </div>
        <div className="px-4">
          <h1 className="text-xl pb-4"> {texts.SolutionIntuitionTitle} </h1>
          <p className="text-left">
           {texts.SolutionIntuitionText}
          </p>
        </div>
        <div className="px-4">
          <h1 className="text-xl pb-4"> {texts.SolutionSearchTitle} </h1>
          <p className="text-left">
            {texts.SolutionSearchText}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Solution);
