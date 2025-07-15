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
  metrics: {
    inventory: "/metrics/inventory",
    dining: "/metrics/dining",
    orders: "/metrics/dashboard",
  },
};

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      error.message =
        "Failed to connect to the server. Please check your internet.";
    }
    return Promise.reject(error);
  }
);

export default api;
