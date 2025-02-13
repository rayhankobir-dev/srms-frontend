import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/auth/login"));
const NotFoundPage = lazy(() => import("@/pages/errors/not-found"));

const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<LoginPage />} />
    <Route path="forgot-password" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AuthRoutes;
