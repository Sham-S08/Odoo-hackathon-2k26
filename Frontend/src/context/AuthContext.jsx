import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";

// Set this to true to bypass real API calls during development
const DEV_MOCK_MODE = true;

const AuthContext = createContext(null);

// Mock user data for different roles
const MOCK_USERS = {
  admin: {
    id: "usr_1",
    name: "Priya Shah",
    email: "admin@dealflow360.com",
    role: "admin",
    company: "DealFlow360",
  },
  sales: {
    id: "usr_2",
    name: "Marcus Lee",
    email: "sales@dealflow360.com",
    role: "sales",
    company: "DealFlow360",
  },
  manager: {
    id: "usr_3",
    name: "Dana Okafor",
    email: "manager@dealflow360.com",
    role: "manager",
    company: "DealFlow360",
  },
  customer: {
    id: "usr_4",
    name: "Acme Corp",
    email: "customer@acme.com",
    role: "customer",
    company: "Acme Corp",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MOCK_MODE) {
      // Check if we have a mock token in localStorage
      const mockToken = localStorage.getItem("df360_mock_token");
      if (mockToken) {
        // Try to find user by token (stored as role)
        const role = mockToken;
        const mockUser = MOCK_USERS[role];
        if (mockUser) {
          setUser(mockUser);
        }
      }
      setLoading(false);
      return;
    }

    // Real API mode
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
    if (DEV_MOCK_MODE) {
      // Mock login: determine role from email
      const email = credentials.email.toLowerCase();
      let role = "sales"; // default

      if (email.includes("admin")) role = "admin";
      else if (email.includes("manager")) role = "manager";
      else if (email.includes("customer")) role = "customer";
      else if (email.includes("sales")) role = "sales";

      const mockUser = MOCK_USERS[role];
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

    // Real API login
    const res = await authApi.login(credentials);
    localStorage.setItem("df360_access_token", res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function register(payload) {
    if (DEV_MOCK_MODE) {
      // Mock register: use selected role
      const role = payload.role || "sales";
      const mockUser = {
        id: "usr_new",
        name: payload.name,
        email: payload.email,
        role: role,
        company: payload.company,
      };
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

    // Real API register
    const res = await authApi.register(payload);
    localStorage.setItem("df360_access_token", res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function logout() {
    if (DEV_MOCK_MODE) {
      localStorage.removeItem("df360_mock_token");
      setUser(null);
      return;
    }

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