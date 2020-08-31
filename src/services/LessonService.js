import http from "../http-common";

const getAll = () => {
  return http.get("/lessons");
};

const getAllStudentView = () => {
  return http.get(`/lessons/published`);
};

const get = id => {
  return http.get(`/lessons/${id}`);
};

const create = data => {
  return http.post("/lessons", data);
};

const update = (id, data) => {
  return http.put(`/lessons/${id}`, data);
};

const remove = id => {
  return http.delete(`/lessons/${id}`);
};

const removeAll = () => {
  return http.delete(`/lessons`);
};

const findByTitle = title => {
  return http.get(`/lessons?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getAllStudentView
};