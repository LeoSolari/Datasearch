// Page.js
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { fetchWells } from "@/redux/slices/wellSlice";
import es from "@/public/es";
import en from "@/public/en";
import UploadShapefile from "@/components/map/uploadShapeFile";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
});

const Page = () => {
  const dispatch = useDispatch();
  const [wellMarkers, setWellMarkers] = useState([]);
  const [shapefileUrl, setShapefileUrl] = useState("");
  const [showMarkers, setShowMarkers] = useState(false);
  const isSpanish = useSelector((state) => state.language.isSpanish);

  const texts = isSpanish ? es : en;

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

  const handleUpload = (url) => {
    setShapefileUrl(url);
  };

  const toggleMarkers = () => {
    setShowMarkers((prevShowMarkers) => !prevShowMarkers);
  };

  return (
    <div className="mx-auto h-full py-24 bg-gray-900 text-blue-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Mapa</h1>
        <UploadShapefile onUpload={handleUpload} />
      <div className="text-center mt-4">
        <button
          onClick={toggleMarkers}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          {showMarkers ? "Ocultar Marcadores" : "Mostrar Marcadores"}
        </button>
      </div>

        <p className="text-lg mb-4">{texts.MapCoords}</p>
      </div>

      <div className="flex justify-around bg-white rounded-lg shadow-md overflow-hidden">
        <MapView markers={showMarkers ? wellMarkers : []} shapefileUrl={shapefileUrl} />
      </div>
      
    </div>
  );
};

export default Page;
