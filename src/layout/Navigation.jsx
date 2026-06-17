import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Navigation.module.css";

function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        {/* about*/}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            About
          </NavLink>
        </li>

        {/* todos-authenticated */}
        <li>
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
        </li>
        {/* profile-authenticated */}
        <li>
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
        </li>
        {/* login-non authenticated */}
        <li>
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
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
