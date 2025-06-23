
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Trophy, Target } from 'lucide-react';

interface TeacherDashboardProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ currentView, onViewChange }) => {
  if (currentView !== 'dashboard') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vista: {currentView}</CardTitle>
            <CardDescription>
              Esta sección está en desarrollo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Contenido para la vista "{currentView}" próximamente disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clases Activas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 nuevas este trimestre
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +5% esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Activos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              En 8 clases diferentes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis Clases</CardTitle>
            <CardDescription>
              Clases que estás gestionando actualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Matemáticas 6A", students: 28, level: "Intermedio" },
                { name: "Ciencias 6B", students: 25, level: "Avanzado" },
                { name: "Historia 5A", students: 30, level: "Básico" },
                { name: "Inglés 6C", students: 22, level: "Intermedio" },
              ].map((classe, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{classe.name}</h4>
                    <p className="text-sm text-gray-600">{classe.students} estudiantes • {classe.level}</p>
                  </div>
                  <button 
                    onClick={() => onViewChange('classes')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en tus clases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nueva tarea creada", class: "Matemáticas 6A", time: "Hace 2 horas" },
                { action: "Evento aleatorio activado", class: "Ciencias 6B", time: "Hace 4 horas" },
                { action: "Grupo formado", class: "Historia 5A", time: "Hace 1 día" },
                { action: "Estudiante revivido", class: "Inglés 6C", time: "Hace 2 días" },
              ].map((activity, index) => (
                <div key={index} className="flex flex-col space-y-1 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.class}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
