"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWells } from "@/redux/slices/wellSlice";
import Link from "next/link";
import {
  filterByName,
  filterByUWI,
  filterByCounty,
  filterByField,
  filterByWellNameFree,
} from "../../../utils/filterUtils";
import Input from "@/components/UI/Input";

// AGREGAR CONDITIONAL RENDERING PARA CUANDO NO SE PUEDE CONECTAR AL SV

const Datos = () => {
  const dispatch = useDispatch();
  const wellsData = useSelector((state) => state.wells.wells);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermUWI, setSearchTermUWI] = useState("");
  const [searchTermCounty, setSearchTermCounty] = useState("");
  const [searchTermField, setSearchTermField] = useState("");
  const [searchTermWellNameFree, setSearchTermWellNameFree] = useState("");

  useEffect(() => {
    dispatch(fetchWells());
  }, [dispatch]);

  const filteredWellsByName = filterByName(wellsData, searchTermName);

  const filteredWellsByUWI = filterByUWI(wellsData, searchTermUWI);

  const filteredWellsByCounty = filterByCounty(wellsData, searchTermCounty);

  const filteredWellsByField = filterByField(wellsData, searchTermField);

  const filteredWellsByWellNameFree = filterByWellNameFree(wellsData, searchTermWellNameFree);

  return (
    <div className="bg-gray-900 h-screen pt-8">
      <div className=" bg-gray-900 text-gray-200 rounded-lg overflow-auto py-20">
        <div className="flex justify-around">
          <Input
            placeholder="Search by well Name..."
            value={searchTermWellNameFree}
            onChange={(e) => setSearchTermWellNameFree(e.target.value)}
          />

          <Input
            placeholder="Search by UWI..."
            value={searchTermUWI}
            onChange={(e) => setSearchTermUWI(e.target.value)}
          />

          {
            /*
            <Input
            placeholder="Search by lease name..."
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
          />
            */
          }

          <Input
            placeholder="Search by county..."
            value={searchTermCounty}
            onChange={(e) => setSearchTermCounty(e.target.value)}
          />

          <Input
            placeholder="Search by field..."
            value={searchTermField}
            onChange={(e) => setSearchTermField(e.target.value)}
          />
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-900 text-gray-300 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-6 ">WELL_NAME_FREE</th>
              <th className="py-3 px-6 ">WELL_UWI</th>
              {
                /*
                <th className="py-3 px-6 ">CURRENT_WELL_LEASE_NAME</th>
                */
              }
              <th className="py-3 px-6 ">WL_COUNTY</th>
              <th className="py-3 px-6 ">FIELD</th>
     
              <th className="py-3 px-6 ">Go to well</th>
            </tr>
          </thead>

          <tbody className="text-gray-300 bg-slate-900 text-sm font-light">
            {filteredWellsByName
              .filter((well) => filteredWellsByUWI.includes(well))
              .filter((well) => filteredWellsByCounty.includes(well))
              .filter((well) => filteredWellsByField.includes(well))
              .filter((well) => filteredWellsByWellNameFree.includes(well))
              .map((well) => (
                <tr
                  key={well.WELL_UWI}
                  className="border-b border-gray-200 hover:bg-blue-500 hover:text-blue-50 text-center"
                >
                  <td className="py-3 px-6 ">{well.WELL_NAME_FREE}</td>
                  <td className="py-3 px-6 ">{well.WELL_UWI}</td>
                  {
                    /*
                    <td className="py-3 px-6 ">{well.CURRENT_WELL_LEASE_NAME}</td>
                    */
                  }
                  <td className="py-3 px-6 ">{well.WL_COUNTY}</td>
                  <td className="py-3 px-6 ">{well.FIELD}</td>
        
                  <td className="py-3 px-6 ">
                    <Link href={`/openWorks/wellHeaders/${well.WELL_ID}`}>
                      <p className="text-blue-500 hover:text-blue-700">→</p>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datos;
