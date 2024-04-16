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
  filterById,
} from "../../utils/filterUtils";
import Input from "@/components/Input";

// AGREGAR CONDITIONAL RENDERING PARA CUANDO NO SE PUEDE CONECTAR AL SV

const Datos = () => {
  const dispatch = useDispatch();
  const wellsData = useSelector((state) => state.wells.wells);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermUWI, setSearchTermUWI] = useState("");
  const [searchTermCounty, setSearchTermCounty] = useState("");
  const [searchTermField, setSearchTermField] = useState("");
  const [searchTermWellId, setSearchTermWellId] = useState("");

  useEffect(() => {
    dispatch(fetchWells());
  }, [dispatch]);

  const filteredWellsByName = filterByName(wellsData, searchTermName);

  const filteredWellsByUWI = filterByUWI(wellsData, searchTermUWI);

  const filteredWellsByCounty = filterByCounty(wellsData, searchTermCounty);

  const filteredWellsByField = filterByField(wellsData, searchTermField);

  const filteredWellsById = filterById(wellsData, searchTermWellId);

  return (
    <div className="bg-white  rounded-lg overflow-auto py-20">
      <Input
        placeholder="Search by lease name..."
        value={searchTermName}
        onChange={(e) => setSearchTermName(e.target.value)}
      />
      <Input
        placeholder="Search by UWI..."
        value={searchTermUWI}
        onChange={(e) => setSearchTermUWI(e.target.value)}
      />
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
      <Input
        placeholder="Search by well ID..."
        value={searchTermWellId}
        onChange={(e) => setSearchTermWellId(e.target.value)}
      />

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
            <th className="py-3 px-6 ">WELL_ID</th>
            <th className="py-3 px-6 ">WELL_UWI</th>
            <th className="py-3 px-6 ">CURRENT_WELL_LEASE_NAME</th>
            <th className="py-3 px-6 ">WL_COUNTY</th>
            <th className="py-3 px-6 ">FIELD</th>
            <th className="py-3 px-6 ">CURRENT_WELL_LEASE_NO</th>
            <th className="py-3 px-6 ">Go to well</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-sm font-light">
          {filteredWellsByName
            .filter((well) => filteredWellsByUWI.includes(well))
            .filter((well) => filteredWellsByCounty.includes(well))
            .filter((well) => filteredWellsByField.includes(well))
            .filter((well) => filteredWellsById.includes(well))
            .map((well) => (
              <tr
                key={well.WELL_UWI}
                className="border-b border-gray-200 hover:bg-gray-100 text-center"
              >
                <td className="py-3 px-6 ">{well.WELL_ID}</td>
                <td className="py-3 px-6 ">{well.WELL_UWI}</td>
                <td className="py-3 px-6 ">{well.CURRENT_WELL_LEASE_NAME}</td>
                <td className="py-3 px-6 ">{well.WL_COUNTY}</td>
                <td className="py-3 px-6 ">{well.FIELD}</td>
                <td className="py-3 px-6 ">{well.CURRENT_WELL_LEASE_NO}</td>
                <td className="py-3 px-6 ">
                  <Link href={`/datos/${well.WELL_ID}`}>
                    <p className="text-blue-500 hover:text-blue-700">→</p>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datos;
