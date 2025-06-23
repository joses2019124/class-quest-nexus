
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { useAuth } from '../contexts/AuthContext';
import { TeacherDashboard } from '../components/TeacherDashboard';
import { StudentDashboard } from '../components/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.role === 'teacher' ? 'Panel del Profesor' : 'Mi Perfil de Aventurero'}
              </h1>
            </div>
            
            {user?.role === 'teacher' ? (
              <TeacherDashboard currentView={currentView} onViewChange={setCurrentView} />
            ) : (
              <StudentDashboard currentView={currentView} />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
