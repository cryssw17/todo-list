import Logoff from "../features/Logoff";
import { useAuth } from "../contexts/AuthContext.jsx";
import Navigation from "./Navigation.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <Navigation />
      <div className={styles.logoutBtn}>
        {isAuthenticated ? <Logoff /> : null}
      </div>
    </div>
  );
}
