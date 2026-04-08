import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalView, setModalView] = useState("login"); // 'login' or 'register'

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Robust unwrapping: if it's wrapped in a 'data' key, unwrap it
        const actualUser = parsed?.data ? parsed.data : parsed;
        setUser(actualUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    // Robust unwrapping for Django Response objects or raw user objects
    const actualUser = userData?.data ? userData.data : userData;
    
    // Ensure we are saving a clean user object to localStorage
    localStorage.setItem("user", JSON.stringify(actualUser));
    setUser(actualUser);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  const openAuthModal = (view = "login") => {
    setModalView(view);
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login, 
      logout, 
      isAuthModalOpen, 
      modalView,
      setModalView,
      openAuthModal, 
      closeAuthModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
