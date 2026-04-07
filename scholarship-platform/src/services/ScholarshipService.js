import API from "./api";

export const getScholarships = () => API.get("/scholarships");

export const addScholarship = (data) => API.post("/scholarships", data);

export const updateScholarship = (id, data) =>
  API.put(`/scholarships/${id}`, data);

export const deleteScholarship = (id) =>
  API.delete(`/scholarships/${id}`);