"use client";

import Link from "next/link";
import Button from "../UI/Button";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { FaLock } from "react-icons/fa";

const HomeLinks = ({ buttonTitle, pText, fadeSide, position, where }) => {
  return (
    <div
      className={`flex  ${
        position ? "flex-row" : "flex-row-reverse"
      } items-center flex-col lg:flex-row`}
    >
      <motion.div
        variants={fadeIn(fadeSide, "tween", 0.5, 2)}
        className="flex-[0.75] p-8 rounded-2xl text-white"
      >
        <Link href={where}>
          <Button className="flex items-center justify-between w-48 h-20 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            <span className="flex-grow">{buttonTitle}</span> <FaLock />
          </Button>
        </Link>
      </motion.div>
      <div className="text-white">
        <motion.p
          variants={fadeIn(fadeSide, "tween", 0.5, 1.7)}
          className="text-white text-justify px-4"
        >
          {pText}
        </motion.p>
      </div>
    </div>
  );
};

export default HomeLinks;
