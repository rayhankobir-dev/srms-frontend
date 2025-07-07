import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_API_BASE_URL;

export const endpoints = {
  users: "/users",
  login: "/users/login",
  logout: "/users/logout",
  forgetPassword: "/users/forget-password",
  resetPassword: "/users/reset-password",
  changePassword: "/users/change-password",
  userProfile: "/users/profile",
  bulkDeleteUsers: "/users/bulk-delete",
  tables: "/tables",
  inventory: "/inventory",
  settings: "/settings",
  orders: "/orders",
  stocks: "/stocks",
  menus: "/menus",
};

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
