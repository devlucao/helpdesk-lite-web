import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AuthGuard from "./AuthGuard";
import AppLayout from "../layout/AppLayout";
import AdminUsersPage from "../pages/AdminUsersPage";
import RoleGuard from "./RoleGuard";
import AgentQueuePage from "../pages/AgentQueuePage";
import TicketCreatePage from "../pages/TicketCreatePage";
import TicketsListPage from "../pages/TicketsListPage";
import TicketDetailsPage from "../pages/TicketDetailsPage";

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
            <Navigate to="tickets" replace />
          } />

          <Route path="admin/users" element={
            <RoleGuard allowedRoles={["admin"]}>
              <AdminUsersPage />
            </RoleGuard>
          } />

          <Route path="queue" element={
            <RoleGuard allowedRoles={["admin", "agent"]}>
              <AgentQueuePage />
            </RoleGuard>
          } />

          <Route path="tickets/new" element={
            <RoleGuard allowedRoles={["client"]}>
              <TicketCreatePage />
            </RoleGuard>
          } />

          <Route path="tickets" element={
            <TicketsListPage />
          } />

          <Route path="tickets/:id" element={
            <TicketDetailsPage />
          } />

        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
