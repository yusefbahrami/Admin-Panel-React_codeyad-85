import { addProductAttrService } from "../../../../Services/products";
import { Alert } from "../../../../Utils/alerts";

export const onSubmit = async (values, actions, productId) => {
  let data = {};
  for (const key in values) {
    // if (values[key]) {
    //   data = { ...data, [key]: { value: values[key] } };
    // }
    if (values[key]) data = { ...data, [key]: { value: values[key] } };
  }
  const res = await addProductAttrService(productId, data);
  if (res.status == 200) {
    Alert("success", "عملیات موفق!", res.data.message);
  }
};
