"use client";

import { Loader, LoadingOverlay, Skeleton } from "@mantine/core";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  email: string;
  id: string;
  avatar: string;
}

interface AuthContextProps {
  authenticated: boolean;
}

interface AuthContextState {
  user: User | null;
}

const AuthContext = createContext<AuthContextState>({
  user: null,
});

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren<AuthContextProps>> = ({
  children,
  authenticated,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/me");
      const data = await response.json();

      console.log(data);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticated) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [authenticated]);

  const contextValue = React.useMemo(() => ({ user }), [user]);

  if (loading) {
    return <LoadingOverlay visible />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
