import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      //passes current location to login for user redirection after successful login
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return <p>Redirecting to Login...</p>;
  }

  return <>{children} </>;
}

export default RequireAuth;
