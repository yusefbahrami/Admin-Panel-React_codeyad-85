import jMoment from "moment-jalaali";
export const convertDateToJalaali = (date) => {
  return jMoment(date).format("jYYYY/jMM/jDD");
};
