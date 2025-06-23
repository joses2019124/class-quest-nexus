
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, BookOpen, Copy, Settings, Trash2, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassesViewProps {
  onViewChange: (view: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({ onViewChange }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos simulados de clases
  const classes = [
    {
      id: 1,
      name: "Matemáticas 6A",
      subject: "Matemáticas",
      grade: "6to Grado",
      students: 28,
      groups: 6,
      tasks: 12,
      joinCode: "MAT6A24",
      createdAt: "2024-01-15",
      color: "bg-blue-500",
      description: "Álgebra básica y geometría"
    },
    {
      id: 2,
      name: "Ciencias 6B",
      subject: "Ciencias Naturales",
      grade: "6to Grado",
      students: 25,
      groups: 5,
      tasks: 8,
      joinCode: "CIE6B24",
      createdAt: "2024-01-20",
      color: "bg-green-500",
      description: "Biología y química básica"
    },
    {
      id: 3,
      name: "Historia 5A",
      subject: "Historia",
      grade: "5to Grado",
      students: 30,
      groups: 7,
      tasks: 15,
      joinCode: "HIS5A24",
      createdAt: "2024-02-01",
      color: "bg-purple-500",
      description: "Historia universal y de México"
    },
    {
      id: 4,
      name: "Inglés 6C",
      subject: "Inglés",
      grade: "6to Grado",
      students: 22,
      groups: 4,
      tasks: 10,
      joinCode: "ING6C24",
      createdAt: "2024-02-10",
      color: "bg-orange-500",
      description: "Inglés intermedio"
    }
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.joinCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: `El código ${code} ha sido copiado al portapapeles`,
    });
  };

  const deleteClass = (className: string) => {
    toast({
      title: "Clase eliminada",
      description: `La clase ${className} ha sido eliminada`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Mis Clases</h2>
          <p className="text-gray-600">Gestiona todas tus clases y estudiantes</p>
        </div>
        <Button onClick={() => onViewChange('create-class')} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nueva Clase</span>
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar clases por nombre, materia o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((classe) => (
          <Card key={classe.id} className="hover:shadow-lg transition-shadow">
            <div className={`h-2 ${classe.color} rounded-t-lg`}></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{classe.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {classe.subject} • {classe.grade}
                  </CardDescription>
                  <p className="text-xs text-gray-500 mt-1">{classe.description}</p>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteClass(classe.name)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Join Code */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">CÓDIGO DE ACCESO</p>
                    <p className="text-lg font-bold text-gray-800">{classe.joinCode}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyJoinCode(classe.joinCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{classe.students}</div>
                  <p className="text-xs text-gray-600">Estudiantes</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{classe.groups}</div>
                  <p className="text-xs text-gray-600">Grupos</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{classe.tasks}</div>
                  <p className="text-xs text-gray-600">Tareas</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => onViewChange('students')}>
                  <Users className="h-4 w-4 mr-2" />
                  Ver Estudiantes
                </Button>
                <Button variant="outline" size="sm" onClick={() => onViewChange('groups')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Gestionar
                </Button>
              </div>

              {/* Info */}
              <div className="text-xs text-gray-500 text-center">
                Creada el {new Date(classe.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clases</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera clase para comenzar'}
            </p>
            {!searchTerm && (
              <Button onClick={() => onViewChange('create-class')}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Clase
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
