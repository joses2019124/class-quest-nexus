
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';
import Dashboard from './Dashboard';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-2xl font-bold text-white">QN</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Quest Nexus</h2>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, mostrar pantalla de autenticación
  if (!user) {
    return <Auth />;
  }

  // Si hay usuario, mostrar dashboard
  return <Dashboard />;
};

export default Index;
