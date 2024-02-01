import httpService from "./httpService";

export const getAllDeliveriesService = () => {
  return httpService("/admin/deliveries", "get", null, "application/json");
};

export const getOneDeliveryService = (deliveryId) => {
  return httpService(
    `/admin/deliveries/${deliveryId}`,
    "get",
    null,
    "application/json"
  );
};

export const addNewDeliveryService = (data) => {
  return httpService("/admin/deliveries", "post", data, "application/json");
};

export const deleteDeliveryService = (deliveryId) => {
  return httpService(
    `/admin/deliveries/${deliveryId}`,
    "delete",
    null,
    "application/json"
  );
};

export const updateDeliveryService = (deliveryId, data) => {
  return httpService(
    `/admin/deliveries/${deliveryId}`,
    "put",
    data,
    "application/json"
  );
};
