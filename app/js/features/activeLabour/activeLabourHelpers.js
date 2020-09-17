export const sortArrayOnLatestEncounterDate = activeLabourData => {
  if (activeLabourData && activeLabourData.length > 1) {
    return activeLabourData.sort(function(a, b) {
      return new Date(b.encounterDatetime) - new Date(a.encounterDatetime);
    });
  }
  return activeLabourData;
};
