'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveyByName } from '@/redux/slices/surveySlice';

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleSurvey, status, error } = useSelector((state) => state.survey);

  const surveyRef = useRef(null); // Ref para el elemento de la tabla de survey

  useEffect(() => {
    if (params.name) {
      const decodedName = decodeURIComponent(params.name);
      dispatch(fetchSurveyByName(decodedName));
    }
  }, [dispatch, params.name]);

  return (
    <div className="p-24">
      <div className="p-4">
        <Link href="/openWorks/wellHeaders/">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Volver a OpenWorks
          </p>
        </Link>
      </div>

      <div ref={surveyRef}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">SURVEY_NAME</th>
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
                <td className="py-2 px-4 border-b">{survey.SURVEY_NAME}</td>
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
