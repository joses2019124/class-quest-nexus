
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
  Filter, 
  Heart, 
  Zap, 
  Coins, 
  Trophy,
  UserX,
  UserCheck,
  Shield,
  Sword,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StudentsView: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Datos simulados de estudiantes
  const students = [
    {
      id: 1,
      name: "Ana García",
      email: "ana.garcia@email.com",
      className: "Matemáticas 6A",
      character: "mage",
      level: 12,
      xp: 2450,
      coins: 180,
      ap: 65,
      maxAp: 100,
      health: 85,
      maxHealth: 100,
      isAlive: true,
      group: "Los Dragones",
      tasksCompleted: 8,
      totalTasks: 10,
      joinedAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      className: "Matemáticas 6A",
      character: "warrior",
      level: 10,
      xp: 1890,
      coins: 240,
      ap: 80,
      maxAp: 120,
      health: 0,
      maxHealth: 120,
      isAlive: false,
      group: "Las Águilas",
      tasksCompleted: 6,
      totalTasks: 10,
      joinedAt: "2024-01-20"
    },
    {
      id: 3,
      name: "María López",
      email: "maria.lopez@email.com",
      className: "Ciencias 6B",
      character: "healer",
      level: 15,
      xp: 3200,
      coins: 320,
      ap: 90,
      maxAp: 110,
      health: 95,
      maxHealth: 110,
      isAlive: true,
      group: "Los Sabios",
      tasksCompleted: 9,
      totalTasks: 10,
      joinedAt: "2024-01-18"
    },
    {
      id: 4,
      name: "Diego Ruiz",
      email: "diego.ruiz@email.com",
      className: "Historia 5A",
      character: "warrior",
      level: 8,
      xp: 1250,
      coins: 95,
      ap: 40,
      maxAp: 120,
      health: 60,
      maxHealth: 120,
      isAlive: true,
      group: "Los Exploradores",
      tasksCompleted: 4,
      totalTasks: 8,
      joinedAt: "2024-02-01"
    }
  ];

  const classes = ["Matemáticas 6A", "Ciencias 6B", "Historia 5A", "Inglés 6C"];

  const getCharacterIcon = (character: string) => {
    switch (character) {
      case 'mage': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'warrior': return <Sword className="h-4 w-4 text-red-500" />;
      case 'healer': return <Plus className="h-4 w-4 text-green-500" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getCharacterName = (character: string) => {
    switch (character) {
      case 'mage': return 'Mago';
      case 'warrior': return 'Guerrero';
      case 'healer': return 'Sanador';
      default: return 'Desconocido';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.className === selectedClass;
    const matchesCharacter = selectedCharacter === 'all' || student.character === selectedCharacter;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'alive' && student.isAlive) ||
                         (selectedStatus === 'dead' && !student.isAlive);
    
    return matchesSearch && matchesClass && matchesCharacter && matchesStatus;
  });

  const reviveStudent = (studentName: string) => {
    toast({
      title: "Estudiante revivido",
      description: `${studentName} ha sido revivido y puede continuar participando`,
    });
  };

  const removeStudent = (studentName: string) => {
    toast({
      title: "Estudiante removido",
      description: `${studentName} ha sido removido de la clase`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Gestión de Estudiantes</h2>
        <p className="text-gray-600">Administra y monitorea el progreso de todos tus estudiantes</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar estudiantes..."
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
            <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los personajes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los personajes</SelectItem>
                <SelectItem value="mage">Mago</SelectItem>
                <SelectItem value="warrior">Guerrero</SelectItem>
                <SelectItem value="healer">Sanador</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="alive">Vivos</SelectItem>
                <SelectItem value="dead">Muertos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              En todas las clases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.isAlive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Participando activamente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Caídos</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {students.filter(s => !s.isAlive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Necesitan revival
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Promedio</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Experiencia total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className={`relative ${!student.isAlive ? 'bg-red-50 border-red-200' : ''}`}>
            {!student.isAlive && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="text-xs">
                  Caído
                </Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{student.name}</span>
                    {getCharacterIcon(student.character)}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {student.className} • {getCharacterName(student.character)} Nv.{student.level}
                  </CardDescription>
                  <p className="text-xs text-gray-500">Grupo: {student.group}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span>Vida</span>
                  </span>
                  <span>{student.health}/{student.maxHealth}</span>
                </div>
                <Progress 
                  value={(student.health / student.maxHealth) * 100} 
                  className="h-2"
                />
              </div>

              {/* AP Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-blue-500" />
                    <span>Energía</span>
                  </span>
                  <span>{student.ap}/{student.maxAp}</span>
                </div>
                <Progress 
                  value={(student.ap / student.maxAp) * 100} 
                  className="h-2"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-600">{student.xp}</div>
                  <p className="text-xs text-gray-600">XP</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Coins className="h-3 w-3" />
                    <span>{student.coins}</span>
                  </div>
                  <p className="text-xs text-gray-600">Monedas</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {student.tasksCompleted}/{student.totalTasks}
                  </div>
                  <p className="text-xs text-gray-600">Tareas</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {!student.isAlive ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => reviveStudent(student.name)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Revivir
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1" disabled>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeStudent(student.name)}
                >
                  <UserX className="h-4 w-4" />
                </Button>
              </div>

              {/* Task Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Progreso de Tareas</span>
                  <span>{Math.round((student.tasksCompleted / student.totalTasks) * 100)}%</span>
                </div>
                <Progress 
                  value={(student.tasksCompleted / student.totalTasks) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron estudiantes</h3>
            <p className="text-gray-500">
              {searchTerm || selectedClass !== 'all' || selectedCharacter !== 'all' || selectedStatus !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Los estudiantes aparecerán aquí cuando se unan a tus clases'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
