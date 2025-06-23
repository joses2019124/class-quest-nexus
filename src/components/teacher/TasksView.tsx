
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Target,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Coins,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TasksView: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Datos simulados de tareas
  const tasks = [
    {
      id: 1,
      title: "Resolver ecuaciones de primer grado",
      description: "Completar los ejercicios 1-20 del libro de matemáticas",
      className: "Matemáticas 6A",
      type: "individual",
      dueDate: "2024-06-25",
      xpReward: 100,
      coinReward: 50,
      status: "active",
      studentsCompleted: 22,
      totalStudents: 28,
      createdAt: "2024-06-20",
      difficulty: "medium"
    },
    {
      id: 2,
      title: "Proyecto del Sistema Solar",
      description: "Crear una maqueta del sistema solar en equipos",
      className: "Ciencias 6B",
      type: "group",
      dueDate: "2024-06-30",
      xpReward: 200,
      coinReward: 100,
      status: "active",
      studentsCompleted: 18,
      totalStudents: 25,
      createdAt: "2024-06-15",
      difficulty: "hard"
    },
    {
      id: 3,
      title: "Ensayo sobre la Revolución Mexicana",
      description: "Escribir un ensayo de 500 palabras sobre los antecedentes",
      className: "Historia 5A",
      type: "individual",
      dueDate: "2024-06-22",
      xpReward: 150,
      coinReward: 75,
      status: "overdue",
      studentsCompleted: 24,
      totalStudents: 30,
      createdAt: "2024-06-10",
      difficulty: "medium"
    },
    {
      id: 4,
      title: "Presentación oral en inglés",
      description: "Preparar una presentación de 3 minutos sobre hobbies",
      className: "Inglés 6C",
      type: "individual",
      dueDate: "2024-07-05",
      xpReward: 120,
      coinReward: 60,
      status: "completed",
      studentsCompleted: 22,
      totalStudents: 22,
      createdAt: "2024-06-01",
      difficulty: "easy"
    },
    {
      id: 5,
      title: "Experimento de química básica",
      description: "Realizar el experimento de volcán de bicarbonato",
      className: "Ciencias 6B",
      type: "group",
      dueDate: "2024-06-28",
      xpReward: 180,
      coinReward: 90,
      status: "draft",
      studentsCompleted: 0,
      totalStudents: 25,
      createdAt: "2024-06-23",
      difficulty: "medium"
    }
  ];

  const classes = ["Matemáticas 6A", "Ciencias 6B", "Historia 5A", "Inglés 6C"];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || task.className === selectedClass;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'overdue': return 'bg-red-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      case 'overdue': return 'Vencida';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const deleteTask = (taskTitle: string) => {
    toast({
      title: "Tarea eliminada",
      description: `La tarea "${taskTitle}" ha sido eliminada`,
      variant: "destructive",
    });
  };

  const publishTask = (taskTitle: string) => {
    toast({
      title: "Tarea publicada",
      description: `La tarea "${taskTitle}" ha sido publicada y está disponible para los estudiantes`,
    });
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getStatusColor(task.status)}>
                {getStatusText(task.status)}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                {getDifficultyText(task.difficulty)}
              </Badge>
              <Badge variant="secondary">
                {task.type === 'individual' ? 'Individual' : 'Grupal'}
              </Badge>
            </div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription className="text-sm mb-2">
              {task.className}
            </CardDescription>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deleteTask(task.title)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Due Date */}
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>Fecha límite: {new Date(task.dueDate).toLocaleDateString()}</span>
          {task.status === 'overdue' && (
            <Badge variant="destructive" className="text-xs">
              VENCIDA
            </Badge>
          )}
        </div>

        {/* Rewards */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4 text-purple-500" />
            <span>{task.xpReward} XP</span>
          </div>
          <div className="flex items-center space-x-1">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span>{task.coinReward} monedas</span>
          </div>
        </div>

        {/* Progress */}
        {task.status !== 'draft' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso de la clase</span>
              <span>{task.studentsCompleted}/{task.totalStudents}</span>
            </div>
            <Progress 
              value={(task.studentsCompleted / task.totalStudents) * 100} 
              className="h-2"
            />
            <p className="text-xs text-gray-500">
              {Math.round((task.studentsCompleted / task.totalStudents) * 100)}% completado
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {task.status === 'draft' ? (
            <Button className="flex-1" onClick={() => publishTask(task.title)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Publicar Tarea
            </Button>
          ) : (
            <Button variant="outline" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Ver Entregas
            </Button>
          )}
          <Button variant="outline">
            <Target className="h-4 w-4" />
          </Button>
        </div>

        {/* Creation Date */}
        <div className="text-xs text-gray-500 text-center">
          Creada el {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Tareas</h2>
          <p className="text-gray-600">Crea, asigna y monitorea las tareas de tus estudiantes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las clases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las clases</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="overdue">Vencidas</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {getTasksByStatus('active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              En progreso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {getTasksByStatus('completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Finalizadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {getTasksByStatus('overdue').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <Edit className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {getTasksByStatus('draft').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sin publicar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="overdue">Vencidas</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getTasksByStatus('active').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getTasksByStatus('completed').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="overdue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getTasksByStatus('overdue').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getTasksByStatus('draft').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tareas</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedClass !== 'all' || selectedStatus !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Crea tu primera tarea para motivar a tus estudiantes'
              }
            </p>
            {!searchTerm && selectedClass === 'all' && selectedStatus === 'all' && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Tarea
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
