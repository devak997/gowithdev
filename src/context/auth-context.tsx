"use client";

import { getCurrentUser } from "@/api/user";
import { LoadingOverlay } from "@mantine/core";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

interface User {
  avatar: string;
  email: string;
  id: string;
  name: string;
}

interface AuthContextProps {
  authenticated: boolean;
}

interface AuthContextState {
  user?: User;
}

const AuthContext = createContext<AuthContextState>({});

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren<AuthContextProps>> = ({
  authenticated,
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setUser(await getCurrentUser());
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

    fetchUser().catch((error: unknown) => {
      console.error(error);
    });
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
