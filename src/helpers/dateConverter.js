export const convertDateToJson = date => {
  try {
    return date.toJSON();
  } catch (e) {
    console.log('Error convert date', e);
  }
};

export const convertDateJsonToDate = dateJson => {
  try {
    return new Date(dateJson);
  } catch (e) {
    console.log('Error convert date', e);
  }
};