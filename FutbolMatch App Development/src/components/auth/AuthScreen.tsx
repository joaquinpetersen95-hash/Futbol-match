import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Chrome, Apple as AppleIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { toast } from 'sonner@2.0.3';

type AuthView = 'login' | 'register' | 'google' | 'apple' | 'email-register';

interface AuthScreenProps {
  onLogin: (username: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    toast.success('¡Bienvenido a FutbolMatch!');
    onLogin(username);
  };

  const handleEmailRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    toast.success('¡Cuenta creada exitosamente!');
    onLogin(username);
  };

  const handleGoogleAuth = () => {
    // Mock Google OAuth integration
    toast.success('Conectando con Google...');
    setTimeout(() => {
      onLogin('Usuario Google');
    }, 1500);
  };

  const handleAppleAuth = () => {
    // Mock Apple OAuth integration
    toast.success('Conectando con Apple ID...');
    setTimeout(() => {
      onLogin('Usuario Apple');
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-field flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-2xl">
            <span className="text-4xl">⚽</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FutbolMatch</h1>
          <p className="text-white/80">Tu cancha, tus reglas</p>
        </div>

        <Card className="p-6">
          {/* Login View */}
          {view === 'login' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
              
              <Input
                label="Usuario"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User size={20} />}
              />
              
              <Input
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={20} />}
              />
              
              <button className="text-sm text-[#2ecc71] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
              
              <Button fullWidth onClick={handleLogin}>
                Ingresar
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">O continúa con</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  fullWidth
                  variant="ghost"
                  onClick={() => setView('email-register')}
                  className="flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Registrarse con Email
                </Button>
                
                <Button
                  fullWidth
                  variant="ghost"
                  onClick={handleGoogleAuth}
                  className="flex items-center justify-center gap-2"
                >
                  <Chrome size={20} />
                  Continuar con Google
                </Button>
                
                <Button
                  fullWidth
                  variant="ghost"
                  onClick={handleAppleAuth}
                  className="flex items-center justify-center gap-2"
                >
                  <AppleIcon size={20} />
                  Continuar con Apple
                </Button>
              </div>
            </div>
          )}

          {/* Email Register View */}
          {view === 'email-register' && (
            <div className="space-y-4">
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
              >
                <ArrowLeft size={20} />
                Volver
              </button>
              
              <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
              
              <Input
                label="Nombre de usuario"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                label="Contraseña"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
              <Button fullWidth onClick={handleEmailRegister}>
                Crear Cuenta
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
