
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Trophy,
  Coins,
  Zap,
  Target,
  Crown,
  Shuffle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const GroupsView: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Datos simulados de grupos
  const groups = [
    {
      id: 1,
      name: "Los Dragones",
      className: "Matemáticas 6A",
      members: [
        { name: "Ana García", character: "mage", xp: 2450, isAlive: true },
        { name: "Pedro Silva", character: "warrior", xp: 1890, isAlive: true },
        { name: "Sofia Chen", character: "healer", xp: 2100, isAlive: true },
        { name: "Luis Torres", character: "mage", xp: 1650, isAlive: false }
      ],
      totalXP: 8090,
      totalCoins: 450,
      averageLevel: 11,
      tasksCompleted: 8,
      totalTasks: 10,
      color: "bg-red-500",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Las Águilas",
      className: "Matemáticas 6A",
      members: [
        { name: "Carlos Mendoza", character: "warrior", xp: 1890, isAlive: false },
        { name: "Elena Vega", character: "healer", xp: 2200, isAlive: true },
        { name: "Roberto Kim", character: "mage", xp: 1750, isAlive: true }
      ],
      totalXP: 5840,
      totalCoins: 320,
      averageLevel: 9,
      tasksCompleted: 6,
      totalTasks: 10,
      color: "bg-blue-500",
      createdAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Los Sabios",
      className: "Ciencias 6B",
      members: [
        { name: "María López", character: "healer", xp: 3200, isAlive: true },
        { name: "David Park", character: "mage", xp: 2800, isAlive: true },
        { name: "Carmen Ruiz", character: "warrior", xp: 2400, isAlive: true },
        { name: "Alex Smith", character: "mage", xp: 2000, isAlive: true },
        { name: "Nina Brown", character: "healer", xp: 2600, isAlive: true }
      ],
      totalXP: 13000,
      totalCoins: 780,
      averageLevel: 13,
      tasksCompleted: 9,
      totalTasks: 10,
      color: "bg-green-500",
      createdAt: "2024-01-18"
    },
    {
      id: 4,
      name: "Los Exploradores",
      className: "Historia 5A",
      members: [
        { name: "Diego Ruiz", character: "warrior", xp: 1250, isAlive: true },
        { name: "Isabella Lee", character: "mage", xp: 1400, isAlive: true },
        { name: "Tommy Wilson", character: "healer", xp: 1300, isAlive: true }
      ],
      totalXP: 3950,
      totalCoins: 215,
      averageLevel: 7,
      tasksCompleted: 4,
      totalTasks: 8,
      color: "bg-purple-500",
      createdAt: "2024-02-01"
    }
  ];

  const classes = ["Matemáticas 6A", "Ciencias 6B", "Historia 5A", "Inglés 6C"];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || group.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getCharacterIcon = (character: string) => {
    switch (character) {
      case 'mage': return '🧙‍♂️';
      case 'warrior': return '⚔️';
      case 'healer': return '💚';
      default: return '🛡️';
    }
  };

  const createRandomGroups = () => {
    toast({
      title: "Grupos creados automáticamente",
      description: "Se han formado grupos de manera aleatoria",
    });
  };

  const deleteGroup = (groupName: string) => {
    toast({
      title: "Grupo eliminado",
      description: `El grupo "${groupName}" ha sido eliminado`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Grupos</h2>
          <p className="text-gray-600">Organiza y administra los grupos de estudiantes</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={createRandomGroups}>
            <Shuffle className="h-4 w-4 mr-2" />
            Grupos Aleatorios
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Grupo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar grupos..."
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
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grupos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.length}</div>
            <p className="text-xs text-muted-foreground">
              Activos en todas las clases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes en Grupos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groups.reduce((sum, group) => sum + group.members.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Participando en equipos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Total de Grupos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groups.reduce((sum, group) => sum + group.totalXP, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Experiencia acumulada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Grupo</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(groups.reduce((sum, group) => sum + group.averageLevel, 0) / groups.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Nivel promedio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${group.color}`}></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <span>{group.name}</span>
                    <Crown className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                  <CardDescription>{group.className} • {group.members.length} miembros</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteGroup(group.name)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Group Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{group.totalXP.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">XP Total</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Coins className="h-4 w-4" />
                    <span>{group.totalCoins}</span>
                  </div>
                  <p className="text-xs text-gray-600">Monedas</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">Nv.{group.averageLevel}</div>
                  <p className="text-xs text-gray-600">Promedio</p>
                </div>
              </div>

              {/* Task Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Progreso de Tareas Grupales</span>
                  <span>{Math.round((group.tasksCompleted / group.totalTasks) * 100)}%</span>
                </div>
                <Progress 
                  value={(group.tasksCompleted / group.totalTasks) * 100} 
                  className="h-2"
                />
              </div>

              {/* Members */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Miembros del Grupo:</h4>
                <div className="space-y-2">
                  {group.members.map((member, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 rounded ${!member.isAlive ? 'bg-red-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{getCharacterIcon(member.character)}</span>
                        <span className={`text-sm font-medium ${!member.isAlive ? 'text-red-600' : ''}`}>
                          {member.name}
                        </span>
                        {!member.isAlive && (
                          <Badge variant="destructive" className="text-xs py-0">
                            Caído
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {member.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trophy className="h-4 w-4 mr-2" />
                  Asignar Tarea
                </Button>
              </div>

              {/* Creation Date */}
              <div className="text-xs text-gray-500 text-center">
                Creado el {new Date(group.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron grupos</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedClass !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Crea grupos para organizar mejor a tus estudiantes'
              }
            </p>
            {!searchTerm && selectedClass === 'all' && (
              <div className="flex justify-center space-x-3">
                <Button onClick={createRandomGroups} variant="outline">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Crear Grupos Aleatorios
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Grupo Manual
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
