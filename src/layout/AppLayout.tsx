import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function AppLayout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const role = auth.user?.role;

  const handleLogout = () => {
    auth.logout();

    navigate("/login", { replace: true });
  }

  return (
    <>
      <header>
        <h1>HelpDesk Lite</h1>

        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="tickets">Tickets</Link>
          {role === "client" && <Link to="tickets/new">New Ticket</Link>}
          {role === "admin" && <Link to="admin/users">Users</Link>}
          {(role === "admin" || role === "agent") && <Link to="queue">Queue</Link>}
        </nav>

        <button type="button" onClick={handleLogout}>Sair</button>
      </header>
      <Outlet />
    </>
  )
}