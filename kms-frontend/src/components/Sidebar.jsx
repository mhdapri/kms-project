import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

import "../styles/sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="kms-sidebar">
      {/* LOGO */}
      <div className="kms-sidebar-header">
        <h2>KMS</h2>
        <span>ReadyMix</span>
      </div>

      {/* MENU */}
      <nav className="kms-sidebar-menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "kms-menu-item active" : "kms-menu-item"
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/knowledge"
          className={({ isActive }) =>
            isActive ? "kms-menu-item active" : "kms-menu-item"
          }
        >
          <BookOpen size={18} />
          <span>Knowledge</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "kms-menu-item active" : "kms-menu-item"
          }
        >
          <Users size={18} />
          <span>Kelola User</span>
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="kms-sidebar-footer">
        <button className="kms-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
