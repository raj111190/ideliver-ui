export const sortArrayOnLatestEncounter = vitalsDataArray => {
  vitalsDataArray.sort(function(a, b) {
    var result = new Date(b.encounterDatetime) - new Date(a.encounterDatetime);
    return result;
  });
};
