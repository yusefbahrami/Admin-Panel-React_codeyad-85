import httpService from "./httpService";

export const getAllDiscountsService = () => {
  return httpService("/admin/discounts", "get", null, "application/json");
};

export const adNewDiscountsService = (data) => {
  return httpService("/admin/discounts", "post", data, "application/json");
};
