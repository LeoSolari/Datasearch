"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MapView from "@/components/map/MapView";
import { fetchWells } from "@/redux/slices/wellSlice";
import Link from "next/link";

const Page = () => {
  const dispatch = useDispatch();
  const [wellMarkers, setWellMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchWells());
      const WELL_LAT_LONG_UWI_ID = res.payload.map(
        ({ WL_SURFACE_LATITUDE, WL_SURFACE_LONGITUDE, WELL_UWI, WELL_ID }) => ({
          lat: WL_SURFACE_LATITUDE,
          long: WL_SURFACE_LONGITUDE,
          uwi: WELL_UWI,
          id: WELL_ID,
        })
      );
      setWellMarkers(WELL_LAT_LONG_UWI_ID);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Mapas</h1>
        <p className="text-lg mb-4">
          ¡Hola! Esta es una pagina que muestra las coordenadas recibidas de la
          base de datos.
        </p>
      </div>

      <div className="flex justify-around bg-white rounded-lg shadow-md overflow-hidden">
        <MapView markers={wellMarkers} />
        <ul className="flex justify-between flex-col text-center">
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/datos/203"}>Ir al pozo UWI: AR580121000100</Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/datos/1881"}>Ir al pozo UWI: AR580352101100</Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/datos/58"}>Ir al pozo UWI: AR580061043200</Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/datos/75"}>Ir al pozo UWI: AR580070000100</Link>
          </li>
          <li className="text-gray-700 hover:underline underline-offset-8">
            <Link href={"/datos/605"}>Ir al pozo UWI: AR620033000200</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
