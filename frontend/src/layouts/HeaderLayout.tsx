import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HeaderLayout.css"

function HeaderLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="dashboard-header">
      <div>
        <p className="header-welcome">Welcome back</p>
        <h2 className="header-user-name">
          {user?.nume} {user?.prenume}
        </h2>
      </div>

      <div className="header-actions">
        <span className="header-role">{user?.role}</span>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default HeaderLayout;
