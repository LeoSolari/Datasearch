'use client'
import React from "react";
import en from "@/public/en";
import es from "@/public/es";

import { useSelector } from "react-redux";

const Page = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  return (
    <div className="p-8">
      <h1 className="text-center text-4xl mb-8 font-bold">Términos y Condiciones</h1>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsTermsTitle }</h2>
          <p className="text-gray-700">
           {texts.TermsTermsText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold"> {texts.TermsAccessTitle} </h2>
          <p className="text-gray-700">
            {texts.TermsAccessText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsIntTitle} </h2>
          <p className="text-gray-700">
          {texts.TermsIntText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsRespTitle}</h2>
          <p className="text-gray-700">
           {texts.TermsRespText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsWeb} </h2>
          <p className="text-gray-700">
          {texts.TermsWebText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsDataProt} </h2>
          <p className="text-gray-700">
            {texts.TermsDataProtText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsUseData} </h2>
          <p className="text-gray-700">
           {texts.TermsUseDataText}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl mb-4 font-bold">{texts.TermsJustice} </h2>
          <p className="text-gray-700">
           {texts.TermsJusticeText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
