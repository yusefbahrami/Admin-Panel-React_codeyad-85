import jMoment from "moment-jalaali";

export const convertDateToJalaali = (date, format = "jYYYY/jMM/jDD") => {
  return jMoment(date).format(format);
};

export const convertFormDateToMiladi = (date) => {
  return jMoment(date, "jD / jM / jYYYY").format("YYYY-M-D");
};
