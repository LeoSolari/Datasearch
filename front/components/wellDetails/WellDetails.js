import React from "react";

const WellDetails = ({ singleWell }) => {
  const wellDetails = [];

  for (const key in singleWell) {
    if (singleWell.hasOwnProperty(key)) {
      wellDetails.push({ label: key, value: singleWell[key] });
    }
  }

  console.log(singleWell)

  return (
    <div className="">
   {
      /*
     {wellDetails.map((detail, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-gray-400">{detail.label.toUpperCase()}</span>
          <span className="font-semibold text-gray-200">
            {detail.value ? detail.value : "No data yet."}
          </span>
        </div>
      ))}
     */ 
    <div className="flex justify-around text-white">
      
      <div>

      <div className="text-center ">
        <div className="py-4">
          <h3 className="p-0.5 text-xl">FIELD</h3>
          <p>{singleWell.FIELD}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">COUNTRY</h3>
          <p>{singleWell.WL_COUNTRY}</p>
        </div>

        <div className="py-4">
         <h3 className="p-0.5 text-xl">GROUND ELEV</h3>
         <p>{singleWell.GROUND_ELEV}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">DATUM TYPE</h3>
          {singleWell.DEPTH_DATUM_TYPE}
        </div>
       
      </div>

      <div className="text-center my-4">
        <div className="py-4">
          <h3 className="p-0.5 text-xl">SURFACE X COORDINATE</h3>
          <p>{singleWell.WL_SURFACE_X_COORDINATE.toFixed(2)}</p></div>
        <div className="py-4">  
          <h3 className="p-0.5 text-xl">SURFACE Y COORDINATE</h3>
          <p>{singleWell.WL_SURFACE_Y_COORDINATE.toFixed(2)}</p></div>
        <div className="py-4">
        <h3 className="p-0.5 text-xl">SURFACE LATITUDE</h3>
          <p>{singleWell.WL_SURFACE_LATITUDE}</p>
          </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">SURFACE LONGITUDE</h3>
          <p>{singleWell.WL_SURFACE_LONGITUDE}</p>
        </div>
      </div>

      </div>

      <div>

      <div className="text-center my-4">

      <div className="py-4">
          <h3 className="p-0.5 text-xl">WELL NAME</h3>
          <p>{singleWell.WELL_NAME_FREE}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">UWI</h3>
          <p>{singleWell.WELL_UWI}</p>
          </div>

        
        <div className="py-4">
          <h3 className="p-0.5 text-xl">FINAL TD</h3>
          <p>{singleWell.FINAL_TD}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">DATUM UNITS</h3>
          {singleWell.FINAL_TD_OUOM}</div>
      </div>

      <div className="text-center ">
        <div className="py-4">
          <h3 className="p-0.5 text-xl">CREATE DATE</h3>
          <p>{singleWell.CREATE_DATE}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">UPDATE DATE</h3>
          <p>{singleWell.UPDATE_DATE}</p>
          </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">UPDATE USER ID</h3>
          <p>{singleWell.UPDATE_USER_ID}</p>
        </div>
        <div className="py-4">
          <h3 className="p-0.5 text-xl">CREATE USER ID</h3>
          <p>{singleWell.CREATE_USER_ID}</p>
        </div>
      </div>

      </div>

    </div>
   }
    </div>
  );
};

export default WellDetails;

