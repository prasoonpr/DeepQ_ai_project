import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const login = async (username, password) => {
  const res = await axios.post(`${API}/token/`, { username, password });
  localStorage.setItem("token", res.data.access);
  return res.data;
};

export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const authAxios = axios.create();
authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
