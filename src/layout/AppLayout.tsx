import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function AppLayout () {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();

    navigate("/login", { replace: true });
  }

  return (
    <>
    <header>
      <h1>HelpDesk Lite</h1>
      <button type="button" onClick={handleLogout}>Sair</button>
    </header>
      <Outlet />
    </>
  )
}