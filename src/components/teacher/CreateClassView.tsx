
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, BookOpen, Users, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateClassViewProps {
  onViewChange: (view: string) => void;
}

export const CreateClassView: React.FC<CreateClassViewProps> = ({ onViewChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    grade: '',
    description: '',
    maxStudents: '30'
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const generateJoinCode = () => {
    const subjects = {
      'Matemáticas': 'MAT',
      'Ciencias': 'CIE',
      'Historia': 'HIS',
      'Inglés': 'ING',
      'Español': 'ESP',
      'Geografía': 'GEO',
      'Educación Física': 'EDU',
      'Arte': 'ART'
    };
    
    const subjectCode = subjects[formData.subject as keyof typeof subjects] || 'CLS';
    const gradeCode = formData.grade.replace(/\D/g, '');
    const randomCode = Math.random().toString(36).substring(2, 5).toUpperCase();
    
    return `${subjectCode}${gradeCode}${randomCode}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simular creación de clase
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newCode = generateJoinCode();
    setGeneratedCode(newCode);
    setIsCreating(false);

    toast({
      title: "¡Clase creada exitosamente!",
      description: `La clase "${formData.name}" ha sido creada con el código ${newCode}`,
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Código copiado",
      description: "El código de acceso ha sido copiado al portapapeles",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      grade: '',
      description: '',
      maxStudents: '30'
    });
    setGeneratedCode('');
  };

  if (generatedCode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => onViewChange('classes')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Clases
          </Button>
          <h2 className="text-3xl font-bold text-gray-800">¡Clase Creada!</h2>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-600">¡Excelente!</CardTitle>
            <CardDescription>
              Tu clase ha sido creada exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">{formData.name}</h3>
              <p className="text-gray-600 mb-4">{formData.subject} • {formData.grade}</p>
              
              <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">CÓDIGO DE ACCESO</p>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-3xl font-bold text-green-600 font-mono">{generatedCode}</span>
                    <Button variant="outline" size="sm" onClick={copyCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Comparte este código con tus estudiantes para que se unan
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-2xl font-bold">0</div>
                <p className="text-sm text-gray-600">Estudiantes</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BookOpen className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-2xl font-bold">0</div>
                <p className="text-sm text-gray-600">Tareas</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1" onClick={() => onViewChange('classes')}>
                Ver Mis Clases
              </Button>
              <Button variant="outline" className="flex-1" onClick={resetForm}>
                Crear Otra Clase
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => onViewChange('classes')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h2 className="text-3xl font-bold text-gray-800">Crear Nueva Clase</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Clase</CardTitle>
            <CardDescription>
              Completa los datos para crear tu nueva clase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Clase *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Matemáticas 6A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Materia *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="ej. Matemáticas"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grado *</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="ej. 6to Grado"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Máximo de Estudiantes</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                    min="1"
                    max="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (Opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el contenido y objetivos de la clase..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">¿Qué sucede después?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Se generará un código único para tu clase</li>
                  <li>• Los estudiantes podrán unirse usando este código</li>
                  <li>• Podrás gestionar grupos, tareas y eventos</li>
                  <li>• Cada estudiante elegirá su personaje (Mago, Guerrero o Sanador)</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isCreating || !formData.name || !formData.subject || !formData.grade}
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando Clase...
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Crear Clase
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
