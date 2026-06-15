import { useLocation, Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="pageCard">
      <h2>404: Not Found</h2>
      <p className="errorMessage">Invalid path: {pathname}</p>
      <div className={styles.linkBar}>
        <Link to="/">Go Home</Link>
        <Link to="/todos">Go to Todos</Link>
        <Link to="/about">Go to About</Link>
        <Link to="/profile">Go to Profile</Link>
      </div>
    </div>
  );
}
export default NotFound;
