import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, Users, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { MOCK_CLUB_RANKINGS, MOCK_AGE_RANKINGS, MOCK_ZONE_RANKINGS } from '../../data/mockData';

interface RankingsSectionProps {
  onNavigate: (section: string) => void;
}

type RankingType = 'clubs' | 'age' | 'zone';

export function RankingsSection({ onNavigate }: RankingsSectionProps) {
  const [activeTab, setActiveTab] = useState<RankingType>('clubs');

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp size={16} className="text-green-500" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-500" />;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable', change: number) => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader title="Rankings" onBack={() => onNavigate('home')} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'clubs'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <Trophy size={20} />
            Clubes
          </button>
          <button
            onClick={() => setActiveTab('age')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'age'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <Users size={20} />
            Edad
          </button>
          <button
            onClick={() => setActiveTab('zone')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'zone'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <MapPin size={20} />
            Zona
          </button>
        </div>

        {/* Club Rankings */}
        {activeTab === 'clubs' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Top Clubes</h3>
            {MOCK_CLUB_RANKINGS.map((club) => (
              <Card key={club.rank} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMedalIcon(club.rank)}</span>
                    {!getMedalIcon(club.rank) && (
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold">
                        {club.rank}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{club.club}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{club.avgElo} ELO</span>
                      <span>•</span>
                      <span>{club.members} miembros</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      {getTrendIcon(club.trend)}
                      <span className={`font-bold ${getTrendColor(club.trend, club.change)}`}>
                        {club.change > 0 && '+'}
                        {club.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Age Rankings */}
        {activeTab === 'age' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Top Jóvenes (21-23 años)</h3>
            {MOCK_AGE_RANKINGS.map((player) => (
              <Card key={player.rank} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMedalIcon(player.rank)}</span>
                    {!getMedalIcon(player.rank) && (
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold">
                        {player.rank}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{player.player}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{player.elo} ELO</span>
                      <span>•</span>
                      <span>{player.age} años</span>
                      <span>•</span>
                      <span>{player.club}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      {getTrendIcon(player.trend)}
                      <span className={`font-bold ${getTrendColor(player.trend, player.change)}`}>
                        {player.change > 0 && '+'}
                        {player.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Zone Rankings */}
        {activeTab === 'zone' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Top Zonas de Buenos Aires</h3>
            {MOCK_ZONE_RANKINGS.map((zone) => (
              <Card key={zone.rank} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMedalIcon(zone.rank)}</span>
                    {!getMedalIcon(zone.rank) && (
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold">
                        {zone.rank}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{zone.zone}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{zone.avgElo} ELO promedio</span>
                      <span>•</span>
                      <span>{zone.players} jugadores</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      {getTrendIcon(zone.trend)}
                      <span className={`font-bold ${getTrendColor(zone.trend, zone.change)}`}>
                        {zone.change > 0 && '+'}
                        {zone.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav activeSection="matches" onNavigate={onNavigate} />
    </div>
  );
}
