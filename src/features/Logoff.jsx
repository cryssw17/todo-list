import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Logoff.module.css";

function Logoff() {
  const [authError, setAuthError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    setIsLoggingOut(true);
    setAuthError("");
    const logoutRequest = await logout();
    if (logoutRequest.success) {
      navigate("/login");
    } else {
      setAuthError(logoutRequest.error);
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      {authError && <p>{authError}</p>}

      <button
        className={styles.logoutBtn}
        type="button"
        disabled={isLoggingOut}
        onClick={handleClick}
      >
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </button>
    </>
  );
}

export default Logoff;
