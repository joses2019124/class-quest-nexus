
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Search, 
  Plus, 
  Clock, 
  Users, 
  Target,
  Sparkles,
  AlertTriangle,
  Gift,
  Skull,
  Heart,
  Coins,
  Trophy,
  Shuffle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EventsView: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Datos simulados de eventos
  const events = [
    {
      id: 1,
      title: "Lluvia de Monedas",
      description: "Todos los estudiantes reciben monedas adicionales",
      className: "Matemáticas 6A",
      type: "positive",
      targetType: "class",
      effect: "Otorga 50 monedas a todos los estudiantes",
      rewards: { coins: 50 },
      affectedStudents: 28,
      createdAt: "2024-06-23T10:30:00",
      status: "completed",
      icon: "💰"
    },
    {
      id: 2,
      title: "Tormenta Mágica",
      description: "Los magos pierden AP pero ganan XP extra",
      className: "Ciencias 6B",
      type: "negative",
      targetType: "character",
      effect: "Los magos pierden 20 AP pero ganan 100 XP",
      rewards: { ap: -20, xp: 100 },
      affectedStudents: 8,
      createdAt: "2024-06-23T09:15:00",
      status: "completed",
      icon: "⚡"
    },
    {
      id: 3,
      title: "Bendición del Sanador",
      description: "Evento especial para sanadores",
      className: "Historia 5A",
      type: "positive",
      targetType: "character",
      effect: "Los sanadores recuperan toda su vida y AP",
      rewards: { health: 100, ap: 100 },
      affectedStudents: 6,
      createdAt: "2024-06-23T08:45:00",
      status: "active",
      icon: "💚"
    },
    {
      id: 4,
      title: "Invasión de Goblins",
      description: "Todos los estudiantes pierden vida",
      className: "Inglés 6C",
      type: "negative",
      targetType: "class",
      effect: "Todos pierden 30 puntos de vida",
      rewards: { health: -30 },
      affectedStudents: 22,
      createdAt: "2024-06-22T16:20:00",
      status: "completed",
      icon: "👹"
    },
    {
      id: 5,
      title: "Fiesta de la Victoria",
      description: "Celebración por buen desempeño grupal",
      className: "Matemáticas 6A",
      type: "positive",
      targetType: "group",
      effect: "El grupo ganador recibe recompensas especiales",
      rewards: { xp: 200, coins: 100 },
      affectedStudents: 5,
      createdAt: "2024-06-22T14:10:00",
      status: "scheduled",
      icon: "🎉"
    }
  ];

  // Eventos predefinidos para generar
  const randomEvents = [
    {
      title: "Lluvia de XP",
      description: "Todos reciben experiencia adicional",
      type: "positive",
      targetType: "class",
      effect: "Otorga 100 XP a todos los estudiantes",
      rewards: { xp: 100 },
      icon: "✨"
    },
    {
      title: "Maldición del Olvido",
      description: "Los estudiantes pierden AP",
      type: "negative",
      targetType: "class",
      effect: "Todos pierden 25 AP",
      rewards: { ap: -25 },
      icon: "🌀"
    },
    {
      title: "Tesoro Encontrado",
      description: "Un estudiante aleatorio encuentra un tesoro",
      type: "positive",
      targetType: "individual",
      effect: "Otorga 200 monedas a un estudiante aleatorio",
      rewards: { coins: 200 },
      icon: "💎"
    },
    {
      title: "Plaga Misteriosa",
      description: "Algunos estudiantes se enferman",
      type: "negative",
      targetType: "individual",
      effect: "3 estudiantes aleatorios pierden 40 de vida",
      rewards: { health: -40 },
      icon: "🦠"
    },
    {
      title: "Poder de los Guerreros",
      description: "Los guerreros se fortalecen",
      type: "positive",
      targetType: "character",
      effect: "Los guerreros ganan vida y AP extra",
      rewards: { health: 50, ap: 30 },
      icon: "⚔️"
    },
    {
      title: "Agotamiento Mágico",
      description: "Los magos se agotan",
      type: "negative",
      targetType: "character",
      effect: "Los magos pierden la mitad de su AP",
      rewards: { ap: -50 },
      icon: "🔮"
    }
  ];

  const classes = ["Matemáticas 6A", "Ciencias 6B", "Historia 5A", "Inglés 6C"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || event.className === selectedClass;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesClass && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'scheduled': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'scheduled': return 'Programado';
      default: return 'Desconocido';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'positive' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getTypeText = (type: string) => {
    return type === 'positive' ? 'Positivo' : 'Negativo';
  };

  const getTargetTypeText = (targetType: string) => {
    switch (targetType) {
      case 'class': return 'Toda la clase';
      case 'group': return 'Grupo específico';
      case 'character': return 'Por personaje';
      case 'individual': return 'Individual';
      default: return 'Desconocido';
    }
  };

  const generateRandomEvent = () => {
    const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    toast({
      title: `¡Evento generado: ${randomEvent.title}!`,
      description: randomEvent.description,
    });
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{event.icon}</span>
              <Badge className={getStatusColor(event.status)}>
                {getStatusText(event.status)}
              </Badge>
              <Badge variant="outline" className={getTypeColor(event.type)}>
                {getTypeText(event.type)}
              </Badge>
            </div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="text-sm mb-2">
              {event.className}
            </CardDescription>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Effect */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-semibold text-sm mb-1">Efecto:</h4>
          <p className="text-sm text-gray-700">{event.effect}</p>
        </div>

        {/* Target & Affected */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Target className="h-4 w-4" />
              <span>Objetivo: {getTargetTypeText(event.targetType)}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Users className="h-4 w-4" />
              <span>Afectados: {event.affectedStudents}</span>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="flex items-center space-x-4 text-sm">
          {event.rewards.xp && (
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-purple-500" />
              <span className={event.rewards.xp > 0 ? 'text-green-600' : 'text-red-600'}>
                {event.rewards.xp > 0 ? '+' : ''}{event.rewards.xp} XP
              </span>
            </div>
          )}
          {event.rewards.coins && (
            <div className="flex items-center space-x-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className={event.rewards.coins > 0 ? 'text-green-600' : 'text-red-600'}>
                {event.rewards.coins > 0 ? '+' : ''}{event.rewards.coins} monedas
              </span>
            </div>
          )}
          {event.rewards.health && (
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span className={event.rewards.health > 0 ? 'text-green-600' : 'text-red-600'}>
                {event.rewards.health > 0 ? '+' : ''}{event.rewards.health} vida
              </span>
            </div>
          )}
          {event.rewards.ap && (
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className={event.rewards.ap > 0 ? 'text-green-600' : 'text-red-600'}>
                {event.rewards.ap > 0 ? '+' : ''}{event.rewards.ap} AP
              </span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center">
          {new Date(event.createdAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Eventos Aleatorios</h2>
          <p className="text-gray-600">Genera eventos sorpresa para mantener la emoción en clase</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={generateRandomEvent}>
            <Shuffle className="h-4 w-4 mr-2" />
            Evento Aleatorio
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Evento
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={generateRandomEvent}>
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Evento Positivo</h3>
            <p className="text-sm text-green-600">Genera recompensas y beneficios</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={generateRandomEvent}>
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-red-800 mb-2">Evento Negativo</h3>
            <p className="text-sm text-red-600">Crea desafíos y obstáculos</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={generateRandomEvent}>
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-blue-800 mb-2">Evento Mixto</h3>
            <p className="text-sm text-blue-600">Combina efectos positivos y negativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar eventos..."
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="positive">Positivos</SelectItem>
                <SelectItem value="negative">Negativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Totales</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              Generados este mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Positivos</CardTitle>
            <Gift className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.type === 'positive').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Recompensas otorgadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Negativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {events.filter(e => e.type === 'negative').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Desafíos creados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Afectados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.reduce((sum, e) => sum + e.affectedStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Impacto total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
          <TabsTrigger value="scheduled">Programados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.filter(e => e.status === 'active').map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.filter(e => e.status === 'completed').map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.filter(e => e.status === 'scheduled').map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron eventos</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedClass !== 'all' || selectedType !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Genera eventos aleatorios para mantener la emoción en clase'
              }
            </p>
            {!searchTerm && selectedClass === 'all' && selectedType === 'all' && (
              <Button onClick={generateRandomEvent}>
                <Shuffle className="h-4 w-4 mr-2" />
                Generar Primer Evento
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
