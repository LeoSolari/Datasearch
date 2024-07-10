'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { fetchSurveyById } from '@/redux/slices/surveySlice';
import { fetchSurveyHdrById } from '@/redux/slices/surveyHdrSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWellById } from '@/redux/slices/wellSlice';

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleSurvey, status, error } = useSelector((state) => state.survey);
  const { singleSurveyHdr, statusHdr, errorHdr } = useSelector((state) => state.surveyHdr);
  const { singleWell } = useSelector((state) => state.wells);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSurveyById(params.id));
      dispatch(fetchSurveyHdrById(params.id));
      dispatch(fetchWellById(params.id))
    }
  }, [dispatch, params.id]);


  if (status === 'loading' || statusHdr === 'loading') {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === 'failed' || statusHdr === 'failed') {
    return <div className="text-center text-red-600">Error: {error || errorHdr}</div>;
  }

  console.log(singleWell)

  return (
    <div className="p-24">
      <div className="p-4">
        <Link href="/openWorks/wellHeaders/">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Volver a OpenWorks
          </p>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">{singleWell?.WELL_NAME_FREE}</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4">Survey Header</h2>
        <table className="min-w-full bg-white border border-gray-300 mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">SURVEY_NAME</th>
              <th className="py-2 px-4 border-b">DATA_SOURCE</th>
              <th className="py-2 px-4 border-b">CREATE_DATE</th>
              <th className="py-2 px-4 border-b">UPDATE_DATE</th>
              <th className="py-2 px-4 border-b">COMPANY_NAME</th>
              <th className="py-2 px-4 border-b">SURVEY_CALC_MTHD</th>
              <th className="py-2 px-4 border-b">NORTH_REFERENCE</th>
              <th className="py-2 px-4 border-b">PREFERRED_SURVEY_IND</th>
              <th className="py-2 px-4 border-b">TOTAL_SAMPLES</th>
              <th className="py-2 px-4 border-b">SCALE_TYPE</th>
              <th className="py-2 px-4 border-b">MAX_INCLINATION</th>
              <th className="py-2 px-4 border-b">MAX_LATERAL_DISTANCE</th>
            </tr>
          </thead>
          <tbody>
            {singleSurveyHdr.map((survey, i) => (
              <tr key={i} className={`bg-${i % 2 === 0 ? 'white' : 'gray-50'} text-center`}>
                <td className="py-2 px-4 border-b">
                  <Link href={`/openWorks/singleSurvey/${encodeURIComponent(survey.SURVEY_NAME)}`}>
                    <p className="text-blue-600 hover:underline">{survey.SURVEY_NAME}</p>
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{survey.DATA_SOURCE}</td>
                <td className="py-2 px-4 border-b">{survey.CREATE_DATE}</td>
                <td className="py-2 px-4 border-b">{survey.UPDATE_DATE}</td>
                <td className="py-2 px-4 border-b">{survey.COMPANY_NAME}</td>
                <td className="py-2 px-4 border-b">{survey.SURVEY_CALC_MTHD}</td>
                <td className="py-2 px-4 border-b">{survey.NORTH_REFERENCE}</td>
                <td className="py-2 px-4 border-b">{survey.PREFERRED_SURVEY_IND}</td>
                <td className="py-2 px-4 border-b">{survey.TOTAL_SAMPLES}</td>
                <td className="py-2 px-4 border-b">{survey.SCALE_TYPE}</td>
                <td className="py-2 px-4 border-b">{survey.MAX_INCLINATION.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{survey.MAX_LATERAL_DISTANCE.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
