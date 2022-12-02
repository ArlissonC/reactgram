import api from "./api";

export const PHOTO_POST = (data: any) => {
  return api.post("/photos", data);
};

export const PHOTOS_GET = (id: any) => {
  return api.get(`/photos/user/${id}`);
};

export const PHOTO_DELETE = (id: any) => {
  return api.delete(`/photos/${id}`);
};

export const PHOTO_UPDATE = (data: any, id: any) => {
  return api.put(`/photos/${id}`, data);
};

export const PHOTO_GET = (id: any) => {
  return api.get(`/photos/${id}`);
};

export const LIKE_PHOTO = (id: any) => {
  return api.put(`/photos/like/${id}`);
};

export const COMMENT_PHOTO = (data: any, id: any) => {
  return api.put(`/photos/comment/${id}`, data);
};

export const GET_ALL_PHOTOS = () => {
  return api.get(`/photos`);
};

export const SEARCH_PHOTOS = (query: string) => {
  return api.get(`/photos/search?q=${query}`);
};
