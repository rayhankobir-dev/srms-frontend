import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoutes from "./auth";
import { AuthLayout } from "@/layouts";
import LoadingScreen from "@/components/common/loading-screen";

const HomePage = lazy(() => import("@/pages/auth/login"));
const NotFoundPage = lazy(() => import("@/pages/errors/not-found"));

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
