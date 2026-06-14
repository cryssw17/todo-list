import { createContext, useContext } from "react";

//create the context
export const AuthContext = createContext();

//custom hook with error checking
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
