import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface User {
  name: string;
  id: string;
}

interface AuthContextProps {
  user: User | null;
  login: (data: { name: string; id: string; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = (data: { name: string; id: string; token: string }) => {
    const jsonData = { name: data.name, id: data.id };
    setUser(jsonData);
    localStorage.setItem("token", data.token);
    navigate("/login");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.setItem("token", "");
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};
