import httpService from "./httpService";

export const getAllDiscountsService = () => {
  return httpService("/admin/discounts", "get", null, "application/json");
};

export const adNewDiscountsService = (data) => {
  return httpService("/admin/discounts", "post", data, "application/json");
};

export const updateDiscountService = (discountId, data) => {
  return httpService(
    `/admin/discounts/${discountId}`,
    "put",
    data,
    "application/json"
  );
};

export const deleteDiscountService = (discountId) => {
  return httpService(
    `/admin/discounts/${discountId}`,
    "delete",
    null,
    "application/json"
  );
};
