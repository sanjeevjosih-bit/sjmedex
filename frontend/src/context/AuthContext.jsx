import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('sjmedex_token');
    const savedUser = localStorage.getItem('sjmedex_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  function login(tokenVal, userData) {
    localStorage.setItem('sjmedex_token', tokenVal);
    localStorage.setItem('sjmedex_user', JSON.stringify(userData));
    setToken(tokenVal);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('sjmedex_token');
    localStorage.removeItem('sjmedex_user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
