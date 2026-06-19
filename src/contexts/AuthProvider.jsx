import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  //state for authentication
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  //login functionality
  const login = async (userEmail, password) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: "include",
      };

      const resp = await fetch("/api/users/logon", options);
      const loginData = await resp.json();

      //success login: update authentication state
      if (resp.status === 200 && loginData.name && loginData.csrfToken) {
        setName(loginData.name);
        setToken(loginData.csrfToken);
        return { success: true };
      } else {
        //fail login: return error
        return {
          success: false,
          error: "Authentication failed: Invalid credentials",
        };
      }
    } catch {
      return {
        success: false,
        error: "Network error during login. Please try again.",
      };
    }
  };

  //logout functionality
  const logout = async () => {
    //check if token is present, clear state if not
    if (!token) {
      setName("");
      setToken("");
      return { success: true };
    } else {
      //api call to /user/logoff
      try {
        const options = {
          method: "POST",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const resp = await fetch("/api/users/logoff", options);
        const logoutData = await resp.json();

        if (resp.status === 200) {
          setName("");
          setToken("");
          return { success: true };
        } else {
          setName("");
          setToken("");
          return {
            success: false,
            error: `Logout failed: ${logoutData.message}`,
          };
        }
      } catch {
        setName("");
        setToken("");
        return {
          success: false,
          error: "Network error during logout. Please try again",
        };
      }
    }
  };

  //context value object
  const value = {
    name,
    token, //CSRF token for API requests
    isAuthenticated: !!token, //Computed boolean for auth status
    login, //authenicates user
    logout, //clears authentication
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
