"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWells } from "@/redux/slices/wellSlice";
import { fetchSurvey } from "@/redux/slices/surveySlice";
import { fetchlogCurve } from "@/redux/slices/logcurveSlice";
import Link from "next/link";
import {
  filterByName,
  filterByUWI,
  filterByCounty,
  filterByField,
  filterByWellNameFree,
} from "../../../utils/filterUtils";
import Input from "@/components/UI/Input";

const Datos = () => {
  const dispatch = useDispatch();
  const wellsData = useSelector((state) => state.wells.wells);
  const surveysData = useSelector((state) => state.survey.survey);
  const logsData = useSelector((state) => state.logCurve.logs); // Logs data
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermUWI, setSearchTermUWI] = useState("");
  const [searchTermCounty, setSearchTermCounty] = useState("");
  const [searchTermField, setSearchTermField] = useState("");
  const [searchTermWellNameFree, setSearchTermWellNameFree] = useState("");

  useEffect(() => {
    dispatch(fetchWells());
    dispatch(fetchSurvey());
    dispatch(fetchlogCurve()); // Fetch log curve data
  }, [dispatch]);

  const filteredWellsByName = filterByName(wellsData, searchTermName);
  const filteredWellsByUWI = filterByUWI(wellsData, searchTermUWI);
  const filteredWellsByCounty = filterByCounty(wellsData, searchTermCounty);
  const filteredWellsByField = filterByField(wellsData, searchTermField);
  const filteredWellsByWellNameFree = filterByWellNameFree(wellsData, searchTermWellNameFree);

  // Ensure surveysData is an array before mapping
  const surveyWellIds = Array.isArray(surveysData) ? surveysData.map(survey => survey.WELL_ID) : [];

  return (
    <div className="bg-gray-900 h-screen pt-8">
      <div className="bg-gray-900 text-gray-200 rounded-lg overflow-auto py-20">
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

          {/* Other input fields */}
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-900 text-gray-300 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-6 ">WELL_NAME_FREE</th>
              <th className="py-3 px-6 ">WELL_UWI</th>
              <th className="py-3 px-6 ">WL_COUNTY</th>
              <th className="py-3 px-6 ">FIELD</th>
              <th className="py-3 px-6">DEPTH DATUM</th>
              <th className="py-3 px-6">DEPTH DATUM TYPE</th>
              <th className="py-3 px-6 ">Well</th>
              <th className="py-3 px-6 ">Survey</th>
              <th className="py-3 px-6 ">Log Curve</th>
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
                  className="border-b border-gray-200 hover:bg-slate-800 hover:text-blue-50 text-center"
                >
                  <td className="py-3 px-6 ">{well.WELL_NAME_FREE}</td>
                  <td className="py-3 px-6 ">{well.WELL_UWI}</td>
                  <td className="py-3 px-6 ">{well.WL_COUNTY}</td>
                  <td className="py-3 px-6 ">{well.FIELD}</td>
                  <td className="py-3 px-6">{parseFloat(well.DEPTH_DATUM).toFixed(2)}</td>
                  <td className="py-3 px-6">{well.DEPTH_DATUM_TYPE}</td>
                  <td className="py-3 px-6 ">
                    <Link href={`/openWorks/wellHeaders/${well.WELL_ID}`}>
                      <p className="text-white hover:text-green-600">→</p>
                    </Link>
                  </td>
                  <td>
                    {surveyWellIds.includes(well.WELL_ID) && (
                      <Link href={`/openWorks/survey/${well.WELL_ID}`}>
                        <p className="text-blue-500 hover:text-green-600">→</p>
                      </Link>
                    )}
                  </td>
                  <td>
                    {logsData.some((log) => log.WELL_ID === well.WELL_ID) && (
                      <Link href={`/openWorks/logcurve/${well.WELL_ID}`}>
                        <p className="text-white hover:text-green-600">→</p>
                      </Link>
                    )}
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
