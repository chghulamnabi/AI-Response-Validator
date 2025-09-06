import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { User, Plan } from '../types';

// In a real app, this would be in a secure database
const USERS_DB_KEY = 'validator_users_db';
const CURRENT_USER_KEY = 'validator_current_user';

const PLAN_CONFIG = {
  free: { uses: 5 },
  pro: { uses: 500 },
  business: { uses: 5000 },
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, pass: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  selectPlan: (plan: Plan) => void;
  decrementUsage: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  const signup = async (email: string, pass: string): Promise<void> => {
    // This is a simulation. In a real app, you'd call your backend API.
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User with this email already exists.');
    }
    users.push({ email, pass }); // In a real app, hash the password
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

    const newUser: User = { email, plan: 'free', usesRemaining: PLAN_CONFIG.free.uses };
    updateUser(newUser);
  };

  const login = async (email: string, pass: string): Promise<void> => {
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.pass === pass);
    if (!foundUser) {
      throw new Error('Invalid email or password.');
    }
    
    // Check if user has existing state, otherwise create new free user state
    const existingUserState = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    if (existingUserState && existingUserState.email === email) {
      updateUser(existingUserState);
    } else {
       const newUser: User = { email, plan: 'free', usesRemaining: PLAN_CONFIG.free.uses };
       updateUser(newUser);
    }
  };

  const logout = () => {
    updateUser(null);
  };

  const selectPlan = (plan: Plan) => {
    if (user) {
      const usesRemaining = PLAN_CONFIG[plan].uses;
      updateUser({ ...user, plan, usesRemaining });
    }
  };

  const decrementUsage = useCallback(() => {
    if (user && user.usesRemaining > 0) {
      updateUser({ ...user, usesRemaining: user.usesRemaining - 1 });
    }
  }, [user]);

  const value = { user, loading, signup, login, logout, selectPlan, decrementUsage };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
