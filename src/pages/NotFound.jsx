import { useLocation, Link } from "react-router";

function NotFound() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div>
      <h2>404: Not Found</h2>
      <p>Invalid path: {pathname}</p>

      <Link to="/">Go Home</Link>
      <Link to="/todos">Go to Todos</Link>
      <Link to="/about">Go to About</Link>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
}
export default NotFound;
