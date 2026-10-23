import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('swiftops_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Fake login: Any non-empty input is accepted
    const cleanEmail = email && email.trim() ? email.trim() : 'admin@swiftops.com';
    const username = cleanEmail.split('@')[0];
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);

    const userData = {
      name: formattedName,
      email: cleanEmail,
      role: 'Operations Lead',
      avatarColor: '#ff2a85',
      loginTime: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('swiftops_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swiftops_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
