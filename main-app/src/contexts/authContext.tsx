import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

export interface IUserData {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  balance: number;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleSetUser = (newUser: AuthUser | null) => {
    setUser(newUser);
  };

  const logout = () => {
    handleSetUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        try {
          const res = await fetch(`${API_URL}/profile?id=${storedUserId}`);
          if (!res.ok) throw new Error("Erro ao buscar usuário");

          const userData: IUserData[] = await res.json();
          const user = userData[0];

          if (!user) throw new Error("Usuário não encontrado");

          handleSetUser({
            uid: user.id.toString(),
            email: user.email,
            displayName: user.name,
            balance: user.balance,
          });
        } catch (err) {
          console.error("Erro ao restaurar usuário:", err);
          logout();
        }
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
