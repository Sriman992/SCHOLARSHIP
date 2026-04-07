import API from "./api";

export const applyScholarship = (data) =>
  API.post("/applications", data);

export const getApplications = () =>
  API.get("/applications");

export const updateApplicationStatus = (id, status) =>
  API.put(`/applications/${id}?status=${status}`);