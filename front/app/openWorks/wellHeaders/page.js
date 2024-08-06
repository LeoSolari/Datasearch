"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWells } from "@/redux/slices/wellSlice";
import { fetchSurvey } from "@/redux/slices/surveySlice";
import { fetchlogCurve } from "@/redux/slices/logcurveSlice";
import { fetchAllPicks } from "@/redux/slices/wellPickSlice";
import Link from "next/link";
import Input from "@/components/UI/Input";

const ITEMS_PER_PAGE = 20;

const Datos = () => {
  const dispatch = useDispatch();
  const wellsData = useSelector((state) => state.wells.wells);
  const surveysData = useSelector((state) => state.survey.survey);
  const logsData = useSelector((state) => state.logCurve.logs);
  const picksData = useSelector((state) => state.wellPicks.picks) || [];

  const [searchTermWellNameFree, setSearchTermWellNameFree] = useState("");
  const [searchTermUWI, setSearchTermUWI] = useState("");
  const [searchTermField, setSearchTermField] = useState("");
  const [searchTermPicks, setSearchTermPicks] = useState("");
  const [searchTermLogCurve, setSearchTermLogCurve] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSurveyName, setSelectedSurveyName] = useState("");
  const [selectedLogCurveId, setSelectedLogCurveId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchWells());
    dispatch(fetchSurvey());
    dispatch(fetchlogCurve());
    dispatch(fetchAllPicks());

    const savedSearchTerms = JSON.parse(localStorage.getItem("searchTerms"));
    if (savedSearchTerms) {
      setSearchTermWellNameFree(savedSearchTerms.searchTermWellNameFree);
      setSearchTermUWI(savedSearchTerms.searchTermUWI);
      setSearchTermField(savedSearchTerms.searchTermField);
      setSearchTermPicks(savedSearchTerms.searchTermPicks);
      setSearchTermLogCurve(savedSearchTerms.searchTermLogCurve);
      setSelectedSurveyName(savedSearchTerms.selectedSurveyName);
      setSelectedLogCurveId(savedSearchTerms.selectedLogCurveId);
    }

    const savedSearchResults = JSON.parse(localStorage.getItem("searchResults"));
    if (savedSearchResults) {
      setSearchResults(savedSearchResults);
    }
  }, [dispatch]);

  const handleSearch = () => {
    if (
      !(
        (searchTermWellNameFree.length >= 2) ||
        (searchTermUWI.length >= 2) ||
        (searchTermField.length >= 2) ||
        (selectedSurveyName.length >= 2) ||
        (searchTermPicks.length >= 2) ||
        (searchTermLogCurve.length >= 2)
      )
    ) {
      alert("Completa alguno de los campos con al menos 2 caracteres");
      return;
    }

    setIsLoading(true); // Establecer el estado de carga a true

    const results = wellsData.filter(well =>
      (searchTermWellNameFree === "" || well.WELL_NAME_FREE.toLowerCase().includes(searchTermWellNameFree.toLowerCase())) &&
      (searchTermUWI === "" || well.WELL_UWI.toLowerCase().includes(searchTermUWI.toLowerCase())) &&
      (searchTermField === "" || well.FIELD.toLowerCase().includes(searchTermField.toLowerCase())) &&
      (selectedSurveyName === "" || surveysData.some(survey => survey.WELL_ID === well.WELL_ID && survey.SURVEY_NAME.toLowerCase().includes(selectedSurveyName.toLowerCase()))) &&
      (selectedLogCurveId === "" || logCurveWellIds.includes(well.WELL_ID)) &&
      (searchTermPicks === "" || picksData.some(pick => pick.PICK_SURF_NAME && pick.PICK_SURF_NAME.toLowerCase().includes(searchTermPicks.toLowerCase()) && pick.WELL_ID === well.WELL_ID)) &&
      (searchTermLogCurve === "" || logsData.some(log => log.LOG_CRV_NAME.toLowerCase().includes(searchTermLogCurve.toLowerCase()) && log.WELL_ID === well.WELL_ID))
    );

    setSearchResults(results);

    const searchTerms = {
      searchTermWellNameFree,
      searchTermUWI,
      searchTermField,
      searchTermPicks,
      searchTermLogCurve,
      selectedSurveyName,
      selectedLogCurveId,
    };
    localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
    localStorage.setItem("searchResults", JSON.stringify(results));
    setCurrentPage(1); // Reset to first page on new search

    setIsLoading(false); // Establecer el estado de carga a false
  };

  const handleClearFilters = () => {
    setSearchTermWellNameFree("");
    setSearchTermUWI("");
    setSearchTermField("");
    setSearchTermPicks("");
    setSearchTermLogCurve("");
    setSelectedSurveyName("");
    setSelectedLogCurveId("");
    setSearchResults([]);
    localStorage.removeItem("searchTerms");
    localStorage.removeItem("searchResults");
    setCurrentPage(1); // Reset to first page on clear
  };

  const handleLinkClick = () => {
    const searchTerms = {
      searchTermWellNameFree,
      searchTermUWI,
      searchTermField,
      searchTermPicks,
      searchTermLogCurve,
      selectedSurveyName,
    };
    localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
  };

  const logCurveWellIds = Array.isArray(logsData) ? logsData.map(log => log.WELL_ID) : [];

  const handleSurveyNameChange = (event) => {
    setSelectedSurveyName(event.target.value);
  };

  const handlePicksSearch = (event) => {
    setSearchTermPicks(event.target.value);
  };

  const handleLogCurveSearch = (event) => {
    setSearchTermLogCurve(event.target.value);
  };

  // Pagination
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const paginatedResults = searchResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log(surveysData)

  return (
    <div className="bg-gray-900 h-screen pt-8">
    <div className="bg-gray-900 text-gray-200 rounded-lg overflow-auto py-20">
      <div className="flex justify-between px-8">
        <div className="flex flex-col space-x-4">
          <Input
            placeholder="Search by Well Name Free..."
            value={searchTermWellNameFree}
            onChange={(e) => setSearchTermWellNameFree(e.target.value)}
          />
          <Input
            placeholder="Search by UWI..."
            value={searchTermUWI}
            onChange={(e) => setSearchTermUWI(e.target.value)}
          />
          <Input
            placeholder="Search by Field..."
            value={searchTermField}
            onChange={(e) => setSearchTermField(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-x-4">
          <Input
            placeholder="Select Survey Name"
            value={selectedSurveyName}
            onChange={handleSurveyNameChange}
          />
          <Input
            placeholder="Search by Picks..."
            value={searchTermPicks}
            onChange={handlePicksSearch}
          />
          <Input
            placeholder="Search by Log Curve Name..."
            value={searchTermLogCurve}
            onChange={handleLogCurveSearch}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-gray-700 text-gray-200 p-2 rounded mr-2"
        >
          Buscar
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-gray-700 text-gray-200 p-2 rounded"
        >
          Limpiar filtros
        </button>
      </div>

      {isLoading ? ( // Mostrar indicador de carga
        <div className="text-center mt-4 text-gray-200">Buscando...</div>
      ) : (
        <>
          <table className="w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-900 text-gray-300 uppercase text-sm leading-normal text-center">
                <th className="py-3 px-16">WELL NAME</th>
                <th className="py-3 px-6">WELL UWI</th>
                <th className="py-3 px-6">
                  <p className="flex flex-col">
                    <span>posgar</span>X COORDINATE (meters)
                  </p>
                </th>
                <th className="py-3 px-6">
                  <p className="flex flex-col">
                    <span>posgar</span>Y COORDINATE (meters)
                  </p>
                </th>
                <th className="py-3 px-6">FIELD</th>
                <th className="py-3 px-6">ELEVATION</th>
                <th className="py-3 px-6">ELEVATION TYPE</th>
                <th className="py-3 px-6">Well</th>
                <th className="py-3 px-6">Survey</th>
                <th className="py-3 px-6">Log Curve</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 bg-slate-900 text-sm font-light">
              {paginatedResults.map((well) => (
                <tr
                  key={well.WELL_UWI}
                  className="border-b border-gray-200 hover:bg-slate-800 hover:text-blue-50 text-center"
                >
                  <td className="py-3 ">{well.WELL_NAME_FREE}</td>
                  <td className="py-3 px-6">{well.WELL_UWI}</td>
                  <td className="py-3 px-6">{well.WL_SURFACE_X_COORDINATE.toFixed(2)}</td>
                  <td className="py-3 px-6">{well.WL_SURFACE_Y_COORDINATE.toFixed(2)}</td>
                  <td className="py-3 px-6">{well.FIELD}</td>
                  <td className="py-3 px-6">{parseFloat(well.DEPTH_DATUM).toFixed(2)}</td>
                  <td className="py-3 px-6">{well.DEPTH_DATUM_TYPE}</td>
                  <td className="py-3 px-6">
                    <Link href={`/openWorks/wellHeaders/${well.WELL_ID}`} onClick={handleLinkClick}>
                      Open Well
                    </Link>
                  </td>
                  <td className="py-3 px-6">
                    {surveysData.some(survey => survey.WELL_ID === well.WELL_ID) ? "Yes" : "No"}
                    {surveysData.some(survey => survey.WELL_ID === well.WELL_ID && survey.SURVEY_NAME.includes("Direc")) ? "✔️" : ""}
                  </td>
                  <td className="py-3 px-6">
                    {logsData.some(log => log.WELL_ID === well.WELL_ID) ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-700 text-gray-200 p-2 rounded mr-2"
              >
                Anterior
              </button>
              <span className="text-gray-200">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-700 text-gray-200 p-2 rounded ml-2"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>
  );
};

export default Datos;
