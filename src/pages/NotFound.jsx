import { useLocation, Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="pageCard">
      <div className={styles.pageContent}>
        <h2>404: Not Found</h2>
        <p className="errorMessage">Invalid path: {pathname}</p>
        <div className={styles.linkBar}>
          <Link className={styles.linkItem} to="/">
            Go Home
          </Link>
          <Link className={styles.linkItem} to="/todos">
            Go to Todos
          </Link>
          <Link className={styles.linkItem} to="/about">
            Go to About
          </Link>
          <Link className={styles.linkItem} to="/profile">
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
