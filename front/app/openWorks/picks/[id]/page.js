'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickById } from '@/redux/slices/pickSlice';

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singlePick, status, error } = useSelector((state) => state.picks);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPickById(params.id));
    }
  }, [dispatch, params.id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-24">
      <h1>Pick Details</h1>
      {singlePick && singlePick.length > 0 ? (
        singlePick.map((pick, index) => (
          <div className='p-8' key={index}>
            <p>WELL_ID: {pick.WELL_ID}</p>
            <p>Name: {pick.PICK_SURF_ID}</p>
            <p>Name: {pick.CREATE_DATE}</p>
            <p>Name: {pick.PICK_DEPTH}</p>
            {/* Render other details of pick as needed */}
          </div>
        ))
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default Page;
