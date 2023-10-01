import httpService from "./httpService";

export const getAllDiscountsService = () => {
  return httpService("/admin/discounts", "get", null, "application/json");
};
