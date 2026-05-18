'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  tokenRef: React.RefObject<string | null>;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const tokenRef = useRef<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('siteclift_token');
    const storedUser = localStorage.getItem('siteclift_user');
    if (token) {
      tokenRef.current = token;
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('siteclift_user');
      }
    }
  }, []);

  function login(token: string, user: User) {
    tokenRef.current = token;
    localStorage.setItem('siteclift_token', token);
    localStorage.setItem('siteclift_user', JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    tokenRef.current = null;
    localStorage.removeItem('siteclift_token');
    localStorage.removeItem('siteclift_user');
    setUser(null);
  }

  function isAuthenticated() {
    return tokenRef.current !== null;
  }

  return (
    <AuthContext.Provider value={{ tokenRef, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
