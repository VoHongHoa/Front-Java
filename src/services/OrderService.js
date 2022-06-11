import axios from "../axios";
const getAllOrder = (page) => {
  return axios.get(`/admin/xem-tat-ca-Orderss/${page}`);
};
const getAllOrderBySeller = (page) => {
  return axios.get(`/seller/xem-tat-ca-Orderss/${page}`);
};
const deleteOrder = (OrderssId) => {
  return axios.delete(`/admin/xoa-Orderss/${OrderssId}`);
};
const deleteOrderBySeller = (OrderssId) => {
  return axios.delete(`/seller/xoa-Orderss/${OrderssId}`);
};

const getDetailOrderById = (orderssId) => {
  return axios.post(`/admin/tim-Orderssde/${orderssId}`);
};
const updateStatusOrder = (data) => {
  return axios.post("/admin/sua-orderss", data);
};

export {
  getAllOrder,
  getAllOrderBySeller,
  deleteOrder,
  deleteOrderBySeller,
  getDetailOrderById,
  updateStatusOrder,
};
