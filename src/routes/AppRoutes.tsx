import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AppHomePage from "../pages/AppHomePage";
import AuthGuard from "./AuthGuard";
import AppLayout from "../layout/AppLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/app" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={
            <AppHomePage />
          } />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
