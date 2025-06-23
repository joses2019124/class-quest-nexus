
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Coins, Heart, Star, Sword, Shield, Wand2 } from 'lucide-react';

interface StudentDashboardProps {
  currentView: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentView }) => {
  if (currentView !== 'profile') {
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

  const characterIcons = {
    mage: Wand2,
    warrior: Sword,
    healer: Shield,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Mi Perfil de Aventurero</span>
            </CardTitle>
            <CardDescription>
              Tu progreso general en todas las clases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">1,250</span>
                </div>
                <p className="text-sm text-gray-600">XP Total</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-700">450</span>
                </div>
                <p className="text-sm text-gray-600">Monedas</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-600">85/100</span>
                </div>
                <p className="text-sm text-gray-600">Energía (AP)</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Energía</span>
                <span className="text-sm text-gray-600">85/100</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progreso hasta el siguiente nivel</span>
                <span className="text-sm text-gray-600">1,250/1,500 XP</span>
              </div>
              <Progress value={83.3} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Vida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-3xl font-bold text-red-600">100/100</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Vivo y Saludable
              </Badge>
              <p className="text-sm text-gray-600">
                ¡Estás en perfectas condiciones para continuar con tus aventuras!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Personajes por Clase</CardTitle>
          <CardDescription>
            Personajes que has creado para cada una de tus clases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { class: "Matemáticas 6A", character: "mage", name: "Algebrus", level: 12, hp: 100 },
              { class: "Ciencias 6B", character: "warrior", name: "Neutron", level: 10, hp: 85 },
              { class: "Historia 5A", character: "healer", name: "Chronos", level: 8, hp: 100 },
            ].map((char, index) => {
              const IconComponent = characterIcons[char.character as keyof typeof characterIcons];
              return (
                <Card key={index} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{char.name}</CardTitle>
                      <IconComponent className={`h-6 w-6 ${
                        char.character === 'mage' ? 'text-game-mage' :
                        char.character === 'warrior' ? 'text-game-warrior' : 'text-game-healer'
                      }`} />
                    </div>
                    <CardDescription className="text-sm">{char.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Nivel {char.level}</span>
                        <Badge variant="outline" className="capitalize">
                          {char.character === 'mage' ? 'Mago' : 
                           char.character === 'warrior' ? 'Guerrero' : 'Sanador'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Vida</span>
                          <span>{char.hp}/100</span>
                        </div>
                        <Progress value={char.hp} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tareas Pendientes</CardTitle>
            <CardDescription>
              Tareas que debes completar próximamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Resolver ejercicios de álgebra", class: "Matemáticas 6A", due: "2 días", reward: "50 XP" },
                { task: "Investigar sobre el sistema solar", class: "Ciencias 6B", due: "5 días", reward: "75 XP" },
                { task: "Ensayo sobre la Revolución Industrial", class: "Historia 5A", due: "1 semana", reward: "100 XP" },
              ].map((task, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{task.task}</h4>
                    <Badge variant="outline" className="text-xs">{task.reward}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{task.class}</span>
                    <span>Vence en {task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logros Recientes</CardTitle>
            <CardDescription>
              Tus últimos logros y recompensas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { achievement: "Primera tarea completada", reward: "25 XP + 10 Monedas", time: "Hace 1 hora" },
                { achievement: "Participación en clase", reward: "15 XP", time: "Hace 3 horas" },
                { achievement: "Trabajo en equipo", reward: "30 XP + 5 Monedas", time: "Ayer" },
                { achievement: "Pregunta respondida", reward: "20 XP", time: "Hace 2 días" },
              ].map((achievement, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm text-green-800">{achievement.achievement}</h4>
                    <span className="text-xs text-green-600">{achievement.time}</span>
                  </div>
                  <p className="text-sm text-green-700">{achievement.reward}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
