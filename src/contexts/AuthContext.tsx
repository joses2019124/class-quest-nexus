
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de usuario desde localStorage
    const savedUser = localStorage.getItem('quest-nexus-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'teacher' | 'student') => {
    setLoading(true);
    // Simulación de login - en producción esto sería una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('quest-nexus-user', JSON.stringify(newUser));
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: 'teacher' | 'student') => {
    setLoading(true);
    // Simulación de registro - en producción esto sería una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      createdAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('quest-nexus-user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quest-nexus-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
