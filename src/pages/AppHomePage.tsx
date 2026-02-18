import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/tokenStorage";

export default function AppHomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();

    navigate("/login", { replace: true });
  }

  return (
    <>
      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  )
}
