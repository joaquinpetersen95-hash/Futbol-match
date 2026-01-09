import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Swords, Coffee, Lock, Trophy as TrophyIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EloRankBadge } from '../rankings/EloRankBadge';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { User, GameMode } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface MobileHomeProps {
  user: User;
  onNavigate: (section: string) => void;
  onModeSelect: (mode: GameMode) => void;
  onRoleToggle: (role: 'player' | 'captain') => void;
}

const GAME_MODES = [
  {
    id: 'competitive' as GameMode,
    name: 'Competitivo',
    description: 'Afecta tu ranking ELO',
    icon: Swords,
    gradient: 'from-orange-500 to-red-600',
    color: '#e74c3c',
    enabled: true
  },
  {
    id: 'casual' as GameMode,
    name: 'Casual',
    description: 'Solo diversión',
    icon: Coffee,
    gradient: 'from-green-500 to-emerald-600',
    color: '#2ecc71',
    enabled: true
  },
  {
    id: 'private' as GameMode,
    name: 'Privado',
    description: 'Solo invitados',
    icon: Lock,
    gradient: 'from-blue-500 to-indigo-600',
    color: '#3498db',
    enabled: true
  },
  {
    id: 'tournament' as GameMode,
    name: 'Torneo',
    description: 'Próximamente',
    icon: TrophyIcon,
    gradient: 'from-purple-500 to-gray-600',
    color: '#9b59b6',
    enabled: false
  }
];

export function MobileHome({ user, onNavigate, onModeSelect, onRoleToggle }: MobileHomeProps) {
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentMode = GAME_MODES[currentModeIndex];

  const handlePrevMode = () => {
    setDirection(-1);
    setCurrentModeIndex((prev) => (prev === 0 ? GAME_MODES.length - 1 : prev - 1));
  };

  const handleNextMode = () => {
    setDirection(1);
    setCurrentModeIndex((prev) => (prev === GAME_MODES.length - 1 ? 0 : prev + 1));
  };

  const handlePlay = () => {
    if (currentMode.enabled) {
      onModeSelect(currentMode.id);
    }
  };

  const getClubColors = (club: string) => {
    const clubColors: Record<string, { primary: string; secondary: string }> = {
      'River Plate': { primary: '#FF0000', secondary: '#FFFFFF' },
      'Boca Juniors': { primary: '#003399', secondary: '#FFCC00' },
      'Racing Club': { primary: '#00BFFF', secondary: '#FFFFFF' },
      'Independiente': { primary: '#CC0000', secondary: '#FFFFFF' },
      'San Lorenzo': { primary: '#000080', secondary: '#FF0000' }
    };
    return clubColors[club] || { primary: '#2ecc71', secondary: '#FFFFFF' };
  };

  const clubColors = getClubColors(user.club);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader showNotifications notificationCount={2} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* User Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Club Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold relative"
              style={{
                background: `linear-gradient(135deg, ${clubColors.primary} 0%, ${clubColors.secondary} 100%)`
              }}
            >
              <span className="text-white drop-shadow-lg">{user.jerseyNumber}</span>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-sm text-gray-400">{user.club}</p>
            </div>
          </div>

          <div className="mb-4">
            <EloRankBadge elo={user.elo} showProgress size="md" />
          </div>

          {/* Role Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Modo:</span>
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                onClick={() => onRoleToggle('player')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  user.role === 'player'
                    ? 'bg-[#2ecc71] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Jugador
              </button>
              <button
                onClick={() => onRoleToggle('captain')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  user.role === 'captain'
                    ? 'bg-[#f1c40f] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Capitán
              </button>
            </div>
          </div>
        </Card>

        {/* Game Mode Carousel */}
        <div className="relative">
          <h3 className="text-lg font-bold mb-4">Selecciona tu modo</h3>

          <div className="relative h-64 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentModeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <Card className="h-full p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentMode.gradient} opacity-20`}
                  />

                  <div className="relative z-10">
                    <currentMode.icon size={64} className="mx-auto mb-4" style={{ color: currentMode.color }} />
                    <h4 className="text-2xl font-bold mb-2">{currentMode.name}</h4>
                    <p className="text-gray-400 mb-4">{currentMode.description}</p>

                    {!currentMode.enabled && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full text-sm">
                        <Lock size={16} />
                        Próximamente
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={handlePrevMode}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextMode}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Mode indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {GAME_MODES.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentModeIndex ? 'w-8 bg-[#2ecc71]' : 'w-2 bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Play Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePlay}
          disabled={!currentMode.enabled}
          className="flex items-center justify-center gap-2"
        >
          <Play size={20} />
          {currentMode.enabled ? 'JUGAR' : 'NO DISPONIBLE'}
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card onClick={() => onNavigate('prode')} className="p-4 text-center cursor-pointer hover:scale-105 transition-transform">
            <TrophyIcon size={32} className="mx-auto mb-2 text-[#f1c40f]" />
            <p className="font-semibold">Prode</p>
          </Card>
          <Card onClick={() => onNavigate('rankings')} className="p-4 text-center cursor-pointer hover:scale-105 transition-transform">
            <TrophyIcon size={32} className="mx-auto mb-2 text-[#2ecc71]" />
            <p className="font-semibold">Rankings</p>
          </Card>
          <Card onClick={() => onNavigate('club')} className="p-4 text-center cursor-pointer hover:scale-105 transition-transform">
            <div
              className="w-8 h-8 rounded-full mx-auto mb-2"
              style={{
                background: `linear-gradient(135deg, ${clubColors.primary} 0%, ${clubColors.secondary} 100%)`
              }}
            />
            <p className="font-semibold">Mi Club</p>
          </Card>
          <Card onClick={() => onNavigate('store')} className="p-4 text-center cursor-pointer hover:scale-105 transition-transform">
            <div className="text-2xl mb-2">🛒</div>
            <p className="font-semibold">Tienda</p>
          </Card>
        </div>
      </div>

      <BottomNav activeSection="home" onNavigate={onNavigate} notificationCount={2} />
    </div>
  );
}
