import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  //redirects if user already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  //Login form submission logic
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoggingOn(true);
    const loginRequest = await login(email, password);
    if (!loginRequest.success) {
      setAuthError(loginRequest.error);
    }
    setIsLoggingOn(false);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="pageCard">
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {authError && <p className="errorMessage">{authError}</p>}

        <TextInputWithLabel
          value={email}
          onChange={handleEmailChange}
          elementId="email"
          labelText="Email:"
          required
        />

        <TextInputWithLabel
          type="password"
          value={password}
          onChange={handlePasswordChange}
          elementId="password"
          labelText="Password:"
          required
        />

        <button className={styles.btn} type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in...." : "Log On"}{" "}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
