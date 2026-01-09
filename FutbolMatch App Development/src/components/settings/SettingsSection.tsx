import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { User } from '../../types';
import { MOCK_CLUBS } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface SettingsSectionProps {
  user: User;
  onNavigate: (section: string) => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

export function SettingsSection({ user, onNavigate, onUpdateUser }: SettingsSectionProps) {
  const [username, setUsername] = useState(user.username);
  const [club, setClub] = useState(user.club);
  const [jerseyNumber, setJerseyNumber] = useState(user.jerseyNumber.toString());
  const [role, setRole] = useState(user.role);

  const clubOptions = Object.keys(MOCK_CLUBS);

  const handleSave = () => {
    const number = parseInt(jerseyNumber);
    if (isNaN(number) || number < 1 || number > 99) {
      toast.error('El número de camiseta debe ser entre 1 y 99');
      return;
    }

    onUpdateUser({
      username,
      club,
      jerseyNumber: number,
      role
    });

    toast.success('Configuración guardada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader title="Configuración" onBack={() => onNavigate('home')} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Profile Section */}
        <Card className="p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <UserIcon size={20} />
            Perfil
          </h3>

          <div className="space-y-4">
            <Input
              label="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre"
            />

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Club favorito
              </label>
              <select
                value={club}
                onChange={(e) => setClub(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
              >
                {clubOptions.map((clubName) => (
                  <option key={clubName} value={clubName} className="bg-gray-900">
                    {clubName}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Número de camiseta"
              type="number"
              min="1"
              max="99"
              value={jerseyNumber}
              onChange={(e) => setJerseyNumber(e.target.value)}
              placeholder="1-99"
            />

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Tipo de usuario
              </label>
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setRole('player')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    role === 'player'
                      ? 'bg-[#2ecc71] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Jugador
                </button>
                <button
                  onClick={() => setRole('captain')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    role === 'captain'
                      ? 'bg-[#f1c40f] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Capitán
                </button>
              </div>
            </div>

            <Button fullWidth onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Información de la cuenta</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ELO Actual:</span>
              <span className="font-semibold text-[#2ecc71]">{user.elo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monedas:</span>
              <span className="font-semibold text-[#f1c40f]">{user.coins}</span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav activeSection="profile" onNavigate={onNavigate} />
    </div>
  );
}
