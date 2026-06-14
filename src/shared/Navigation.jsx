import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function Navigation() {
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  const { isAuthenticated } = useAuth();
  return (
    <nav>
      <ul
        style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}
      >
        {/* about*/}
        <NavLink to="/about" style={navLinkStyle}>
          About
        </NavLink>
        {/* todos-authenticated */}
        {isAuthenticated && (
          <NavLink to="/todos" style={navLinkStyle}>
            Todos
          </NavLink>
        )}
        {/* profile-authenticated */}
        {isAuthenticated && (
          <NavLink to="/profile" style={navLinkStyle}>
            Profile
          </NavLink>
        )}
        {/* login-non authenticated */}
        {!isAuthenticated && (
          <NavLink to="/login" style={navLinkStyle}>
            Login
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
