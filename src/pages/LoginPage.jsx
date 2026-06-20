import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginPage.module.css";
import DOMPurify from "dompurify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [inputError, setInputError] = useState("");

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

  //check for valid input to be used before sanitization
  function isValidLoginInput(email, password) {
    return email.trim() !== "" && password.trim() !== "";
  }

  //Login form submission logic
  async function handleSubmit(event) {
    event.preventDefault();

    const isLoginValid = isValidLoginInput(email, password);

    if (!isLoginValid) {
      setInputError("No email or password entered. Please try again.");
      return;
    }
    setIsLoggingOn(true);
    const sanitizedEmail = DOMPurify.sanitize(email.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    const sanitizedPassword = DOMPurify.sanitize(password.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    const loginRequest = await login(sanitizedEmail, sanitizedPassword);
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

        {inputError && <p className="errorMessage">{inputError}</p>}

        <TextInputWithLabel
          value={email}
          onChange={handleEmailChange}
          elementId="email"
          labelText="Email:"
          required
          placeholder="Enter email"
          maxLength="50"
        />

        <TextInputWithLabel
          type="password"
          value={password}
          onChange={handlePasswordChange}
          elementId="password"
          labelText="Password:"
          required
          placeholder=" Enter password"
          maxLength="50"
        />

        <button className={styles.btn} type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in...." : "Log On"}{" "}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
