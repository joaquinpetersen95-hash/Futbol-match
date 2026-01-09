import React from 'react';
import { Home, Trophy, Clock, User, Bell } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  notificationCount?: number;
}

export function BottomNav({ activeSection, onNavigate, notificationCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'matches', icon: Trophy, label: 'Partidos' },
    { id: 'history', icon: Clock, label: 'Historial' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
                isActive ? 'text-[#2ecc71]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {item.id === 'matches' && notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {notificationCount}
                  </div>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
