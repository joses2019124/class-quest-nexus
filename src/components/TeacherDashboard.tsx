
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Trophy, Target, Plus, Eye, Settings, Zap } from 'lucide-react';
import { ClassesView } from './teacher/ClassesView';
import { StudentsView } from './teacher/StudentsView';
import { GroupsView } from './teacher/GroupsView';
import { TasksView } from './teacher/TasksView';
import { EventsView } from './teacher/EventsView';
import { MagicSelectorView } from './teacher/MagicSelectorView';
import { CreateClassView } from './teacher/CreateClassView';

interface TeacherDashboardProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ currentView, onViewChange }) => {
  // Renderizar vista específica
  const renderView = () => {
    switch (currentView) {
      case 'classes':
        return <ClassesView onViewChange={onViewChange} />;
      case 'students':
        return <StudentsView />;
      case 'groups':
        return <GroupsView />;
      case 'tasks':
        return <TasksView />;
      case 'events':
        return <EventsView />;
      case 'selector':
        return <MagicSelectorView />;
      case 'create-class':
        return <CreateClassView onViewChange={onViewChange} />;
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    // Datos simulados de las clases del profesor
    const classes = [
      {
        id: 1,
        name: "Matemáticas 6A",
        students: 28,
        level: "Intermedio",
        activeGroups: 6,
        completedTasks: 89,
        avgXP: 1250,
        color: "bg-blue-500",
        joinCode: "MAT6A"
      },
      {
        id: 2,
        name: "Ciencias 6B",
        students: 25,
        level: "Avanzado",
        activeGroups: 5,
        completedTasks: 92,
        avgXP: 1450,
        color: "bg-green-500",
        joinCode: "CIE6B"
      },
      {
        id: 3,
        name: "Historia 5A",
        students: 30,
        level: "Básico",
        activeGroups: 7,
        completedTasks: 76,
        avgXP: 980,
        color: "bg-purple-500",
        joinCode: "HIS5A"
      },
      {
        id: 4,
        name: "Inglés 6C",
        students: 22,
        level: "Intermedio",
        activeGroups: 4,
        completedTasks: 85,
        avgXP: 1150,
        color: "bg-orange-500",
        joinCode: "ING6C"
      }
    ];

    // Calcular estadísticas totales
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
    const totalGroups = classes.reduce((sum, cls) => sum + cls.activeGroups, 0);
    const avgCompletionRate = Math.round(classes.reduce((sum, cls) => sum + cls.completedTasks, 0) / classes.length);
    const avgXPAcrossClasses = Math.round(classes.reduce((sum, cls) => sum + cls.avgXP, 0) / classes.length);

    return (
      <div className="space-y-6">
        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                En {classes.length} clases activas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clases Activas</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
              <p className="text-xs text-muted-foreground">
                Gestionando este semestre
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa Completada</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Promedio de tareas completadas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Grupos Activos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGroups}</div>
              <p className="text-xs text-muted-foreground">
                En todas las clases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mis Clases - Panel Principal */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mis Clases</CardTitle>
                <CardDescription>
                  Gestiona y monitorea todas tus clases desde aquí
                </CardDescription>
              </div>
              <Button onClick={() => onViewChange('create-class')} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nueva Clase</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {classes.map((classe) => (
                <Card key={classe.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${classe.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{classe.name}</CardTitle>
                        <CardDescription>{classe.students} estudiantes • {classe.level}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {classe.activeGroups} grupos
                        </Badge>
                        <p className="text-xs text-gray-500">Código: {classe.joinCode}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{classe.completedTasks}%</div>
                        <p className="text-xs text-gray-600">Tareas</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{classe.avgXP}</div>
                        <p className="text-xs text-gray-600">XP Promedio</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{classe.activeGroups}</div>
                        <p className="text-xs text-gray-600">Grupos</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onViewChange('students')}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Estudiantes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onViewChange('groups')}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Grupos
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onViewChange('selector')}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Selector
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                <span>Crear Tarea</span>
              </CardTitle>
              <CardDescription>
                Asigna una nueva tarea a tus estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => onViewChange('tasks')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Evento Aleatorio</span>
              </CardTitle>
              <CardDescription>
                Genera un evento sorpresa para tus estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={() => onViewChange('events')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Generar Evento
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <span>Selector Mágico</span>
              </CardTitle>
              <CardDescription>
                Selecciona estudiantes o grupos aleatoriamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => onViewChange('selector')}
              >
                <Target className="h-4 w-4 mr-2" />
                Abrir Selector
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en todas tus clases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nueva tarea creada", class: "Matemáticas 6A", time: "Hace 2 horas", type: "task" },
                { action: "Evento aleatorio activado", class: "Ciencias 6B", time: "Hace 4 horas", type: "event" },
                { action: "Grupo formado", class: "Historia 5A", time: "Hace 1 día", type: "group" },
                { action: "Estudiante revivido", class: "Inglés 6C", time: "Hace 2 días", type: "revive" },
                { action: "Selector mágico usado", class: "Matemáticas 6A", time: "Hace 3 días", type: "selector" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'task' ? 'bg-blue-500' :
                      activity.type === 'event' ? 'bg-red-500' :
                      activity.type === 'group' ? 'bg-green-500' :
                      activity.type === 'revive' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.class}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderView()}
    </div>
  );
};
