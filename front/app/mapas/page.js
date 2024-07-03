"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { fetchWells } from "@/redux/slices/wellSlice";
import Link from "next/link";
import es from "@/public/es";
import en from "@/public/en";
import { useSelector } from "react-redux";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
});

const Page = () => {
  const dispatch = useDispatch();
  const [wellMarkers, setWellMarkers] = useState([]);
  const isSpanish = useSelector((state) => state.language.isSpanish)

  const texts = isSpanish ? es : en

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchWells());
      const WELL_LAT_LONG_UWI_ID = res.payload.map(
        ({ WL_SURFACE_LATITUDE, WL_SURFACE_LONGITUDE, WELL_NAME_FREE, WELL_ID }) => ({
          lat: WL_SURFACE_LATITUDE,
          long: WL_SURFACE_LONGITUDE,
          uwi: WELL_NAME_FREE,
          id: WELL_ID,
        })
      );
      setWellMarkers(WELL_LAT_LONG_UWI_ID);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="mx-auto h-full py-24 bg-gray-900 text-blue-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Mapa</h1>
        <p className="text-lg mb-4">
          {texts.MapCoords}
        </p>
      </div>

      <div className="flex justify-around bg-white rounded-lg shadow-md overflow-hidden">
        <MapView markers={wellMarkers} />
       {
        /*
           <ul className="flex justify-between flex-col text-center">
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/openWorks/wellHeaders/203"}>
              {texts.MapGoToWell}: AR580121000100
            </Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/openWorks/wellHeaders/1881"}>
              {texts.MapGoToWell}: AR580352101100
            </Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/openWorks/wellHeaders/58"}>
              {texts.MapGoToWell}: AR580061043200
            </Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/openWorks/wellHeaders/75"}>
              {texts.MapGoToWell}: AR580070000100
            </Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/openWorks/wellHeaders/605"}>
              {texts.MapGoToWell}: AR620033000200
            </Link>
          </li>
        </ul>
        */
       }
      </div>
    </div>
  );
};

export default Page;
