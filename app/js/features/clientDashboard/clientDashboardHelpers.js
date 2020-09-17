export const filterArray = (data, patientUuid) => {
  if (data && data.length >= 1) {
    data = data.filter(d => d.patient === patientUuid);
    return data[0].status;
  }
  return data;
};
