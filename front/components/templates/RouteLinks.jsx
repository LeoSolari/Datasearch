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
      <div className="flex lg:justify-around w-full">
        <div className="flex flex-row-reverse">
          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.DashboardTitle}
              /*
                pText={texts.DashboardText}
              */
              position
              fadeSide="left"
              /*where="/dashboard"*/
              where="openWorks/picks"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.MapsTitle}
              /*
                pText={texts.DashboardText}
              */
              fadeSide="left"
              position
              where="/mapas"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.ArchiveTitle}
              /*
                pText={texts.DashboardText}
              */
              fadeSide="left"
              where="http://192.168.3.99:8080/"
            />
          </div>

          <div className="flex pt-8">
            <HomeLinks
              buttonTitle={texts.OpenWorksTitle}
              /*
                pText={texts.DashboardText}
              */
              fadeSide="left"
              position
              where="/openWorks/wellHeaders"
            />
          </div>
         
          </div>
        
        </div>
        <div className="flex pt-8">
            <HomeLinks
              buttonTitle="ir a log curve"
              /*
                pText={texts.DashboardText}
              */
              fadeSide="left"
              position
              where="/openWorks/logcurve"
            />
      </div>
    </div>
  );
};

export default SectionWrapper(RouteLinks);
