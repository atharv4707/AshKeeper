import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, ApiClientError, getAuthToken, setAuthToken } from '../lib/api';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

interface AuthContextValue {
  token: string | null;
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncToken = (nextToken: string | null) => {
    setTokenState(nextToken);
    setAuthToken(nextToken);
  };

  const clearSession = () => {
    syncToken(null);
    setAuthUser(null);
  };

  const refreshSession = async (): Promise<boolean> => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setAuthUser(null);
      setTokenState(null);
      setIsLoading(false);
      return false;
    }

    try {
      const user = await authApi.me(currentToken);
      setTokenState(currentToken);
      setAuthUser(user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.warn('Session refresh failed:', error);
      clearSession();
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    syncToken(response.access_token);

    const me = await authApi.me(response.access_token);
    setAuthUser(me);
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await authApi.signup({ username, email, password });
    syncToken(response.access_token);

    const me = await authApi.me(response.access_token);
    setAuthUser(me);
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      authUser,
      isAuthenticated: Boolean(token && authUser),
      isLoading,
      login,
      signup,
      logout,
      refreshSession,
    }),
    [token, authUser, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
