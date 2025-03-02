import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Initialize navigation

  // Check login status from localStorage on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");  // ✅ Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
