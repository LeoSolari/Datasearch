export const filterByName = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) =>
      well.CURRENT_WELL_LEASE_NAME &&
      well.CURRENT_WELL_LEASE_NAME.toLowerCase().includes(
        searchTerm.toLowerCase()
      )
  );
};

export const filterByUWI = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) =>
      well.WELL_UWI &&
      well.WELL_UWI.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterByCounty = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) =>
      well.WL_COUNTY &&
      well.WL_COUNTY.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterByField = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) =>
      well.FIELD && well.FIELD.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterById = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) => well.WELL_ID && String(well.WELL_ID).includes(searchTerm)
  );
};


