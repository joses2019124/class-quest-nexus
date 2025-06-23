
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Users, 
  BookOpen, 
  Zap, 
  Settings, 
  User, 
  Trophy,
  Dice6,
  Target,
  Home,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  const teacherMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      id: "dashboard",
    },
    {
      title: "Mis Clases",
      icon: BookOpen,
      id: "classes",
    },
    {
      title: "Estudiantes",
      icon: Users,
      id: "students",
    },
    {
      title: "Grupos",
      icon: Target,
      id: "groups",
    },
    {
      title: "Tareas",
      icon: Trophy,
      id: "tasks",
    },
    {
      title: "Eventos",
      icon: Zap,
      id: "events",
    },
    {
      title: "Selector Mágico",
      icon: Dice6,
      id: "selector",
    },
  ];

  const studentMenuItems = [
    {
      title: "Mi Perfil",
      icon: User,
      id: "profile",
    },
    {
      title: "Mis Clases",
      icon: BookOpen,
      id: "classes",
    },
    {
      title: "Mis Tareas",
      icon: Trophy,
      id: "tasks",
    },
    {
      title: "Mi Grupo",
      icon: Target,
      id: "group",
    },
  ];

  const menuItems = user?.role === 'teacher' ? teacherMenuItems : studentMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-game-mage to-game-warrior rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">QN</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Quest Nexus</h2>
            <p className="text-xs text-gray-500">{user?.name}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentView === item.id}
                  >
                    <button
                      onClick={() => onViewChange(item.id)}
                      className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'teacher' && (
          <SidebarGroup>
            <SidebarGroupLabel>Acciones Rápidas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => onViewChange('create-class')}
                      className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Nueva Clase</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="w-full"
        >
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
