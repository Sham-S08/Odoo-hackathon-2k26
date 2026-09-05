import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("df360_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("df360_access_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const res = await authApi.login(credentials);
    localStorage.setItem("df360_access_token", res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function register(payload) {
    const res = await authApi.register(payload);
    localStorage.setItem("df360_access_token", res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("df360_access_token");
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, setUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
