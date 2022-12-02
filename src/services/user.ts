import api from "./api";

export const GET_USER = () => {
  return api.get("/users/profile");
};

export const UPDATE_USER_PROFILE = (data: any) => {
  return api.put("/users/", data);
};

export const GET_USER_PROFILE = (id: string) => {
  return api.get(`/users/${id}`);
};
