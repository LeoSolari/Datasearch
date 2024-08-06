'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveyByNameAndWellId } from '@/redux/slices/surveySlice';
import * as XLSX from 'xlsx';

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleSurvey, status, error } = useSelector((state) => state.survey);
  const [filteredSurvey, setFilteredSurvey] = useState([]);
  const surveyRef = useRef(null); // Ref para el elemento de la tabla de survey

  useEffect(() => {
    if (params.name && params.wellId) {
      const decodedName = decodeURIComponent(params.name);
      const decodedWellId = decodeURIComponent(params.wellId);
      console.log("Dispatching fetchSurveyByNameAndWellId with:", decodedName, decodedWellId);
      dispatch(fetchSurveyByNameAndWellId({ surveyName: decodedName, wellId: decodedWellId }));
    }
  }, [dispatch, params.name, params.wellId]);
  
  useEffect(() => {
    if (status === 'succeeded') {
      console.log("Single Survey Data:", singleSurvey);
      const filtered = singleSurvey.filter(survey =>
        survey.SURVEY_NAME === params.name &&
        survey.WELL_ID === params.wellId
      );
      console.log("Filtered Survey Data:", filtered);
      setFilteredSurvey(filtered);
    } else if (status === 'failed') {
      console.error("Fetch survey failed with error:", error);
    }
  }, [singleSurvey, status, params.name, params.wellId]);
  

  const handleDownloadExcel = () => {
    const data = singleSurvey.map((survey) => ({
      'MEASURED DEPTH': parseFloat(survey.MEASURED_DEPTH),
      'INCLINATION': parseFloat(survey.INCLINATION),
      'AZIMUTH': parseFloat(survey.AZIMUTH),
      'TRUE VERT DEPTH': parseFloat(survey.TRUE_VERT_DEPTH),
      'X OFFSET': parseFloat(survey.X_OFFSET),
      'Y OFFSET': parseFloat(survey.Y_OFFSET),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Data');

    const fileName = singleSurvey?.SURVEY_NAME ? `${singleSurvey.SURVEY_NAME}.xlsx` : 'survey_data.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  const handleDownloadCSV = () => {
    const data = singleSurvey.map((survey) => ({
      'MEASURED DEPTH': parseFloat(survey.MEASURED_DEPTH),
      'INCLINATION': parseFloat(survey.INCLINATION),
      'AZIMUTH': parseFloat(survey.AZIMUTH),
      'TRUE VERT DEPTH': parseFloat(survey.TRUE_VERT_DEPTH),
      'X OFFSET': parseFloat(survey.X_OFFSET),
      'Y OFFSET': parseFloat(survey.Y_OFFSET),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const fileName = singleSurvey?.SURVEY_NAME ? `${singleSurvey.SURVEY_NAME}.csv` : 'survey_data.csv';

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-24">
      <div className="p-4">
        <Link href="/openWorks/wellHeaders/">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Volver a OpenWorks
          </p>
        </Link>
        <button 
          onClick={handleDownloadExcel}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Descargar Excel
        </button>

        <button 
          onClick={handleDownloadCSV}
          className="mt-4 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Descargar CSV
        </button>

        <button 
          onClick={() => window.history.back()}
          className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-12 rounded">
          Volver a la página previa
        </button>
      </div>

      <div ref={surveyRef}>
        <p className='text-center py-4 font-bold text-3xl'>Survey name: {params.name} </p>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">MEASURED DEPTH</th>
              <th className="py-2 px-4 border-b">INCLINATION</th>
              <th className="py-2 px-4 border-b">AZIMUTH</th>
              <th className="py-2 px-4 border-b">TRUE VERT DEPTH</th>
              <th className="py-2 px-4 border-b">X OFFSET</th>
              <th className="py-2 px-4 border-b">Y OFFSET</th>
            </tr>
          </thead>
          <tbody>
            {singleSurvey.map((survey, i) => (
              <tr key={i} className={`bg-${i % 2 === 0 ? 'white' : 'gray-50'} text-center`}>
                <td className="py-2 px-4 border-b">{parseFloat(survey.MEASURED_DEPTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.INCLINATION).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.AZIMUTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.TRUE_VERT_DEPTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.X_OFFSET).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.Y_OFFSET).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
