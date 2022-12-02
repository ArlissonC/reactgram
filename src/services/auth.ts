import api from "./api";

export const REGISTER_USER = (data: any) => {
  return api.post("/users/register", data);
};

export const LOGIN_USER = (data: any) => {
  return api.post("/users/login", data);
};
