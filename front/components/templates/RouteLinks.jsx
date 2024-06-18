"use client";
import { SectionWrapper } from "@/hoc";
import HomeLinks from "./HomeLinks";
import es from "@/public/es";
import en from "@/public/en";
import {useSelector } from "react-redux";

const RouteLinks = () => {

  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  return (
    <div>
      <div className="flex lg:justify-around w-full  ">
        <div className="flex flex-col">
          <div className="flex ">
            <HomeLinks
              buttonTitle={texts.DashboardTitle}
              pText={texts.DashboardText}
              position
              fadeSide="left"
              where="/dashboard"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.MapsTitle}
              pText={texts.MapsText}
              fadeSide="left"
              position
              where="/mapas"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.ArchiveTitle}
              pText={texts.ArchiveText}
              fadeSide="left"
              where="http://127.0.0.1:5000/"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.OpenWorksTitle}
              pText={texts.OpenWorksText}
              fadeSide="left"
              position
              where="/openWorks/wellHeaders"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(RouteLinks);
