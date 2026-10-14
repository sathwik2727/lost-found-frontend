import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api/items" });

export const getItems = (params) => api.get("", { params });
export const createItem = (item) => api.post("", item);
export const claimItem = (id) => api.patch(`/${id}/claim`);
export const deleteItem = (id) => api.delete(`/${id}`);
