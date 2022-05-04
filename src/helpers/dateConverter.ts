export const convertDateToJson = (date: Date) => {
  try {
    return date.toJSON();
  } catch (e) {
    console.log('Error convert date', e);
  }
};

export const convertDateJsonToDate = (dateJson: string) => {
  try {
    return new Date(dateJson);
  } catch (e) {
    console.log('Error convert date', e);
  }
};