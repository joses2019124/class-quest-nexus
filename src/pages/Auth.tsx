
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const { login, register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await register(email, password, name, role);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-game-mage to-game-warrior rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">QN</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Class Quest Nexus</CardTitle>
          <CardDescription>Plataforma gamificada para el aprendizaje</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
                Registrarse
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Tipo de Usuario</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as 'teacher' | 'student')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Estudiante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher">Profesor</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-register">Contraseña</Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Tipo de Usuario</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as 'teacher' | 'student')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student-reg" />
                      <Label htmlFor="student-reg">Estudiante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher-reg" />
                      <Label htmlFor="teacher-reg">Profesor</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
