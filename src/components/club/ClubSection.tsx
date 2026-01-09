import React from 'react';
import { Trophy, Users, Calendar, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { EloRankBadge } from '../rankings/EloRankBadge';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { MOCK_CLUBS } from '../../data/mockData';
import { User } from '../../types';

interface ClubSectionProps {
  user: User;
  onNavigate: (section: string) => void;
}

export function ClubSection({ user, onNavigate }: ClubSectionProps) {
  const club = MOCK_CLUBS[user.club] || MOCK_CLUBS['River Plate'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader title="Mi Club" onBack={() => onNavigate('home')} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Club Header */}
        <Card className="p-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${club.colors.primary} 0%, ${club.colors.secondary} 100%)`
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${club.colors.primary} 0%, ${club.colors.secondary} 100%)`
                }}
              >
                <span className="text-white drop-shadow-lg">{club.name.substring(0, 2)}</span>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{club.name}</h2>
                <p className="text-gray-400">Fundado en {club.founded}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Users size={24} className="mx-auto mb-1 text-[#2ecc71]" />
                <p className="text-2xl font-bold">{club.members}</p>
                <p className="text-xs text-gray-400">Miembros</p>
              </div>

              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Trophy size={24} className="mx-auto mb-1 text-[#f1c40f]" />
                <p className="text-2xl font-bold">{club.avgElo}</p>
                <p className="text-xs text-gray-400">ELO Promedio</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Club Stats */}
        <Card className="p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Award size={20} className="text-[#2ecc71]" />
            Estadísticas del Club
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Récord de victorias:</span>
              <span className="font-bold text-green-500">{club.wins}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Récord de derrotas:</span>
              <span className="font-bold text-red-500">{club.losses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Win Rate:</span>
              <span className="font-bold text-[#2ecc71]">
                {Math.round((club.wins / (club.wins + club.losses)) * 100)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Trophies */}
        <Card className="p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Trophy size={20} className="text-[#f1c40f]" />
            Logros
          </h3>

          <div className="space-y-2">
            {club.trophies.map((trophy, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
              >
                <Trophy size={20} className="text-[#f1c40f]" />
                <span className="font-semibold">{trophy}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Players */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Top 3 Jugadores del Club</h3>

          <div className="space-y-3">
            {club.topPlayers.slice(0, 3).map((player, index) => (
              <div
                key={player.id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {index === 0 && <span className="text-2xl">🥇</span>}
                  {index === 1 && <span className="text-2xl">🥈</span>}
                  {index === 2 && <span className="text-2xl">🥉</span>}
                </div>

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${club.colors.primary} 0%, ${club.colors.secondary} 100%)`
                  }}
                >
                  👤
                </div>

                <div className="flex-1">
                  <p className="font-bold">{player.name}</p>
                  <p className="text-sm text-gray-400">{player.position}</p>
                </div>

                <div className="text-right">
                  <EloRankBadge elo={player.elo} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* My Position in Club */}
        <Card className="p-4 bg-gradient-to-br from-[#2ecc71]/20 to-[#27ae60]/20 border border-[#2ecc71]/30">
          <h3 className="font-bold mb-3">Tu posición en el club</h3>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(135deg, ${club.colors.primary} 0%, ${club.colors.secondary} 100%)`
              }}
            >
              <span className="text-white font-bold">{user.jerseyNumber}</span>
            </div>

            <div className="flex-1">
              <p className="font-bold text-lg">{user.username}</p>
              <EloRankBadge elo={user.elo} size="sm" />
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-[#2ecc71]">
                #{Math.floor(Math.random() * 50) + 1}
              </p>
              <p className="text-xs text-gray-400">En el club</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav activeSection="profile" onNavigate={onNavigate} />
    </div>
  );
}
