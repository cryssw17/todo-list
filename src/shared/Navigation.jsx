import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Navigation.module.css";

function Navigation() {
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.navBar}>
      <ul
        style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}
      >
        {/* about*/}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          About
        </NavLink>
        {/* todos-authenticated */}
        {isAuthenticated && (
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Todos
          </NavLink>
        )}
        {/* profile-authenticated */}
        {isAuthenticated && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Profile
          </NavLink>
        )}
        {/* login-non authenticated */}
        {!isAuthenticated && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Login
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
