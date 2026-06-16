import { useLocation, Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="pageCard">
      <div className={styles.pageContent}>
        <h2 className="pageTitle">404: Not Found</h2>
        <p className="errorMessage">Invalid path: {pathname}</p>
        <ul className={styles.linkBar}>
          <li>
            <Link to="/" className={styles.linkItem}>
              Go Home
            </Link>
          </li>
          <li>
            <Link to="/todos" className={styles.linkItem}>
              Go to Todos
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.linkItem}>
              Go to About
            </Link>
          </li>
          <li>
            <Link to="/profile" className={styles.linkItem}>
              Go to Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NotFound;
