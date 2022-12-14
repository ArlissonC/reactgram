import axios from "axios";

const api = axios.create({
  baseURL: "https://reactgram-ap1.herokuapp.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")!;

  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
