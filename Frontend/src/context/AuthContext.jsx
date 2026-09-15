import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";
import { ROLES } from "../utils/constants";

// Set to TRUE for mock mode (no backend needed)
const DEV_MOCK_MODE = true;

const AuthContext = createContext(null);

// Mock user data for 5 roles - matched to sample data
const MOCK_USERS = {
  admin: {
    id: "usr-1",
    name: "Admin User",
    email: "admin@dealflow360.local",
    role: ROLES.ADMIN,
    company: "DealFlow360",
    customerName: null
  },
  sales: {
    id: "usr-2",
    name: "Sales User",
    email: "sales@dealflow360.local",
    role: ROLES.SALES,
    company: "DealFlow360",
    customerName: null
  },
  manager: {
    id: "usr-3",
    name: "Manager User",
    email: "manager@dealflow360.local",
    role: ROLES.MANAGER,
    company: "DealFlow360",
    customerName: null
  },
  finance: {
    id: "usr-5",
    name: "Finance User",
    email: "finance@dealflow360.local",
    role: ROLES.FINANCE,
    company: "DealFlow360",
    customerName: null
  },
  customer: {
    id: "usr-4",
    name: "Acme Customer",
    email: "customer@abc.local",
    role: ROLES.CUSTOMER,
    company: "Acme Corporation",
    customerName: "Acme Corporation"  // ← This links to sample data
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MOCK_MODE) {
      const mockToken = localStorage.getItem("df360_mock_token");
      if (mockToken) {
        const mockUser = MOCK_USERS[mockToken];
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
      const email = credentials.email.toLowerCase();
      let role = ROLES.SALES;

      if (email.includes("admin")) role = ROLES.ADMIN;
      else if (email.includes("manager")) role = ROLES.MANAGER;
      else if (email.includes("finance")) role = ROLES.FINANCE;
      else if (email.includes("customer") || email.includes("abc")) role = ROLES.CUSTOMER;
      else if (email.includes("sales")) role = ROLES.SALES;

      const mockUser = MOCK_USERS[role];
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

    const res = await authApi.login(credentials);
    localStorage.setItem("df360_access_token", res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }

  async function register(payload) {
    if (DEV_MOCK_MODE) {
      const role = payload.role || ROLES.SALES;
      const mockUser = {
        id: "usr_new",
        name: payload.name,
        email: payload.email,
        role: role,
        company: payload.company,
        customerName: role === ROLES.CUSTOMER ? payload.company : null
      };
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

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