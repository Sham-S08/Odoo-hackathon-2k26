import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";
import { ROLES } from "../utils/constants";

const DEV_MOCK_MODE = import.meta.env.VITE_ENABLE_MOCK_MODE === "true";

const AuthContext = createContext(null);

// Mock user data for 5 roles
const MOCK_USERS = {
  admin: {
    id: "usr_1",
    name: "Priya Shah",
    email: "admin@dealflow360.com",
    role: ROLES.ADMIN,
    company: "DealFlow360",
  },
  sales: {
    id: "usr_2",
    name: "Marcus Lee",
    email: "sales@dealflow360.com",
    role: ROLES.SALES,
    company: "DealFlow360",
  },
  manager: {
    id: "usr_3",
    name: "Dana Okafor",
    email: "manager@dealflow360.com",
    role: ROLES.MANAGER,
    company: "DealFlow360",
  },
  finance: {
    id: "usr_5",
    name: "Rahul Sharma",
    email: "finance@dealflow360.com",
    role: ROLES.FINANCE,
    company: "DealFlow360",
  },
  customer: {
    id: "usr_4",
    name: "Acme Corp",
    email: "customer@acme.com",
    role: ROLES.CUSTOMER,
    company: "Acme Corp",
  },
};

const BACKEND_TO_FRONTEND_ROLE = {
  ADMIN: ROLES.ADMIN,
  SALES: ROLES.SALES,
  MANAGER: ROLES.MANAGER,
  FINANCE_MANAGER: ROLES.FINANCE,
  CUSTOMER: ROLES.CUSTOMER,
};

const FRONTEND_TO_BACKEND_ROLE = {
  [ROLES.ADMIN]: "ADMIN",
  [ROLES.SALES]: "SALES",
  [ROLES.MANAGER]: "MANAGER",
  [ROLES.FINANCE]: "FINANCE_MANAGER",
  [ROLES.CUSTOMER]: "CUSTOMER",
};

function toFrontendUser(user) {
  if (!user) return null;

  return {
    ...user,
    apiRole: user.role,
    role: BACKEND_TO_FRONTEND_ROLE[user.role] || user.role?.toLowerCase(),
  };
}

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

    const token = localStorage.getItem("df360_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((res) => setUser(toFrontendUser(res.data.user)))
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
      else if (email.includes("customer")) role = ROLES.CUSTOMER;
      else if (email.includes("sales")) role = ROLES.SALES;

      const mockUser = MOCK_USERS[role];
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

    const res = await authApi.login(credentials);
    localStorage.setItem("df360_access_token", res.data.token);
    const user = toFrontendUser(res.data.user);
    setUser(user);
    return user;
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
      };
      localStorage.setItem("df360_mock_token", role);
      setUser(mockUser);
      return mockUser;
    }

    const res = await authApi.register({
      companyName: payload.company,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: FRONTEND_TO_BACKEND_ROLE[payload.role] || "SALES",
    });
    localStorage.setItem("df360_access_token", res.data.token);
    const user = toFrontendUser(res.data.user);
    setUser(user);
    return user;
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
