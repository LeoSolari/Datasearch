export const filterById = (wellsData, searchTerm) => {
  return wellsData.filter(
    (well) => well.WELL_ID && String(well.WELL_ID).includes(searchTerm)
  );
};
