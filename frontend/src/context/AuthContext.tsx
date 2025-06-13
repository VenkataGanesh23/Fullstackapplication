import { createContext, useContext, useEffect, useState } from "react";
import { NEW_PASSWORD, REQUEST_PASSWORD_RESET } from "../component/graphql/queries";
import { useMutation } from "@apollo/client";

interface AuthContectType {
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  newPassword: (token: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContectType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [resetPasswordMutation] = useMutation(REQUEST_PASSWORD_RESET);
  const [newPasswordMutation] = useMutation(NEW_PASSWORD);

 useEffect(() => {
  const token = localStorage.getItem("token");
  setIsAuthenticated(!!token);

  if (token) {
    setUser({ token });
  } else {
    setUser(null);
  }
}, []);

const login = (token: string) => {
  localStorage.setItem("token", token);
  setIsAuthenticated(true);
  setUser({ token });
};


  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    try {
      await resetPasswordMutation({ variables: { email } });
    } catch (err) {
      console.log(err);
    }
  };

  const newPassword = async (token: string, password: string) => {
    try {
      await newPasswordMutation({ variables: { token, password } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        newPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useauth must be used inside AuthProvider"); // This is what you're hitting
  }
  return ctx;
};
