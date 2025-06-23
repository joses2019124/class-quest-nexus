
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  Users, 
  User, 
  Shuffle, 
  Play, 
  RotateCcw,
  Sparkles,
  Crown,
  Zap,
  Heart,
  Sword,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MagicSelectorView: React.FC = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectorType, setSelectorType] = useState('student');
  const [characterFilter, setCharacterFilter] = useState('all');
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  // Datos simulados
  const classes = [
    { id: 'mat6a', name: 'Matemáticas 6A', students: 28, groups: 6 },
    { id: 'cie6b', name: 'Ciencias 6B', students: 25, groups: 5 },
    { id: 'his5a', name: 'Historia 5A', students: 30, groups: 7 },
    { id: 'ing6c', name: 'Inglés 6C', students: 22, groups: 4 }
  ];

  const students = [
    { id: 1, name: "Ana García", character: "mage", level: 12, group: "Los Dragones", isAlive: true },
    { id: 2, name: "Carlos Mendoza", character: "warrior", level: 10, group: "Las Águilas", isAlive: false },
    { id: 3, name: "María López", character: "healer", level: 15, group: "Los Sabios", isAlive: true },
    { id: 4, name: "Diego Ruiz", character: "warrior", level: 8, group: "Los Exploradores", isAlive: true },
    { id: 5, name: "Sofia Chen", character: "healer", level: 11, group: "Los Dragones", isAlive: true },
    { id: 6, name: "Pedro Silva", character: "mage", level: 9, group: "Las Águilas", isAlive: true },
    { id: 7, name: "Elena Vega", character: "healer", level: 13, group: "Los Sabios", isAlive: true },
    { id: 8, name: "Luis Torres", character: "warrior", level: 7, group: "Los Exploradores", isAlive: true }
  ];

  const groups = [
    { id: 1, name: "Los Dragones", members: 4, avgLevel: 11 },
    { id: 2, name: "Las Águilas", members: 3, avgLevel: 9 },
    { id: 3, name: "Los Sabios", members: 5, avgLevel: 13 },
    { id: 4, name: "Los Exploradores", members: 3, avgLevel: 7 }
  ];

  const getCharacterIcon = (character: string) => {
    switch (character) {
      case 'mage': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'warrior': return <Sword className="h-4 w-4 text-red-500" />;
      case 'healer': return <Plus className="h-4 w-4 text-green-500" />;
      default: return <User className="h-4 w-4" />;
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

  const getAvailableItems = () => {
    if (!selectedClass) return [];

    if (selectorType === 'student') {
      let filteredStudents = students.filter(student => student.isAlive);
      
      if (characterFilter !== 'all') {
        filteredStudents = filteredStudents.filter(student => student.character === characterFilter);
      }
      
      return filteredStudents;
    } else {
      return groups;
    }
  };

  const runSelector = async () => {
    if (!selectedClass) {
      toast({
        title: "Selecciona una clase",
        description: "Debes elegir una clase antes de usar el selector",
        variant: "destructive",
      });
      return;
    }

    const availableItems = getAvailableItems();
    
    if (availableItems.length === 0) {
      toast({
        title: "No hay elementos disponibles",
        description: "No se encontraron estudiantes o grupos para seleccionar",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setSelectedResult(null);

    // Simular animación de selección
    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const selected = availableItems[randomIndex];
    
    setSelectedResult(selected);
    setIsSpinning(false);

    // Agregar al historial
    const newHistoryItem = {
      id: Date.now(),
      type: selectorType,
      selected: selected,
      timestamp: new Date(),
      className: classes.find(c => c.id === selectedClass)?.name
    };
    
    setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);

    // Mostrar notificación con confetti
    toast({
      title: `¡${selectorType === 'student' ? 'Estudiante' : 'Grupo'} seleccionado!`,
      description: `${selected.name} ha sido elegido por el selector mágico`,
    });
  };

  const resetSelector = () => {
    setSelectedResult(null);
    setIsSpinning(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Selector Mágico</h2>
        <p className="text-gray-600">Selecciona estudiantes o grupos de manera aleatoria y divertida</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <span>Configuración</span>
              </CardTitle>
              <CardDescription>
                Configura los parámetros del selector mágico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Clase:</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una clase" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.students} estudiantes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de selección:</label>
                <Select value={selectorType} onValueChange={setSelectorType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Estudiante Individual</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="group">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Grupo</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectorType === 'student' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtrar por personaje:</label>
                  <Select value={characterFilter} onValueChange={setCharacterFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los personajes</SelectItem>
                      <SelectItem value="mage">Solo Magos</SelectItem>
                      <SelectItem value="warrior">Solo Guerreros</SelectItem>
                      <SelectItem value="healer">Solo Sanadores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Elementos disponibles:</strong> {getAvailableItems().length}
                </p>
                {selectorType === 'student' && characterFilter !== 'all' && (
                  <p className="text-xs text-blue-600 mt-1">
                    Solo estudiantes vivos del tipo {getCharacterName(characterFilter)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={runSelector} 
                  disabled={isSpinning || !selectedClass}
                  className="w-full"
                  size="lg"
                >
                  {isSpinning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Seleccionando...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activar Selector
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={resetSelector} 
                  variant="outline"
                  className="w-full"
                  disabled={isSpinning}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selector Display */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <span>Selector Mágico</span>
                <Sparkles className="h-6 w-6 text-purple-500" />
              </CardTitle>
              <CardDescription>
                {isSpinning ? '¡La magia está funcionando!' : '¿Quién será el elegido?'}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              {isSpinning ? (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 border-8 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-purple-600 animate-pulse">
                    Consultando las fuerzas mágicas...
                  </p>
                </div>
              ) : selectedResult ? (
                <div className="space-y-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <Crown className="h-16 w-16 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-purple-600">
                      ¡{selectedResult.name}!
                    </h3>
                    {selectorType === 'student' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          {getCharacterIcon(selectedResult.character)}
                          <span className="text-lg">{getCharacterName(selectedResult.character)} Nv.{selectedResult.level}</span>
                        </div>
                        <p className="text-gray-600">Grupo: {selectedResult.group}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-lg flex items-center justify-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>{selectedResult.members} miembros</span>
                        </p>
                        <p className="text-gray-600">Nivel promedio: {selectedResult.avgLevel}</p>
                      </div>
                    )}
                  </div>
                  <div className="animate-bounce">
                    <span className="text-4xl">🎉</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <Target className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-medium text-gray-500">
                      Listo para la selección
                    </h3>
                    <p className="text-gray-400">
                      Configura los parámetros y activa el selector
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selection History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>Historial de Selecciones</span>
              </CardTitle>
              <CardDescription>
                Últimas selecciones realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${item.type === 'student' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        <div>
                          <p className="font-medium text-sm">{item.selected.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.className} • {item.type === 'student' ? 'Estudiante' : 'Grupo'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Shuffle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">No hay selecciones previas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
