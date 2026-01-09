import React, { useState } from 'react';
import { Trophy, TrendingUp, Target, Zap, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { MOCK_PRODE_MATCHES } from '../../data/mockData';
import { ProdePrediction } from '../../types';

interface ProdeSectionProps {
  onNavigate: (section: string) => void;
}

export function ProdeSection({ onNavigate }: ProdeSectionProps) {
  const [activeLeague, setActiveLeague] = useState<'argentina' | 'mundial'>('argentina');
  const [predictions, setPredictions] = useState<Record<string, 'home' | 'draw' | 'away'>>({});

  const stats = {
    totalPredictions: 45,
    correctPredictions: 28,
    accuracy: 62,
    currentStreak: 3,
    bestStreak: 7,
    points: 1420,
    rank: 158
  };

  const leaderboard = [
    { rank: 1, name: 'MartínGamer', points: 2850, accuracy: 78 },
    { rank: 2, name: 'LauraFutbol', points: 2720, accuracy: 75 },
    { rank: 3, name: 'CarlosPro', points: 2680, accuracy: 74 },
    { rank: 4, name: 'SofíaStar', points: 2540, accuracy: 72 },
    { rank: 5, name: 'DiegoMaster', points: 2420, accuracy: 71 }
  ];

  const matches = MOCK_PRODE_MATCHES.filter((m) => m.league === activeLeague);

  const handlePrediction = (matchId: string, prediction: 'home' | 'draw' | 'away') => {
    setPredictions({ ...predictions, [matchId]: prediction });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader title="Prode" onBack={() => onNavigate('home')} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* User Stats */}
        <Card className="p-4 bg-gradient-to-br from-[#f1c40f]/20 to-[#f39c12]/20 border border-[#f1c40f]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f1c40f] to-[#f39c12] rounded-full flex items-center justify-center">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.points} pts</p>
              <p className="text-sm text-gray-400">Ranking #{stats.rank}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2ecc71]">{stats.accuracy}%</p>
              <p className="text-xs text-gray-400">Aciertos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#f1c40f]">{stats.currentStreak}</p>
              <p className="text-xs text-gray-400">Racha</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#3498db]">{stats.totalPredictions}</p>
              <p className="text-xs text-gray-400">Predicciones</p>
            </div>
          </div>
        </Card>

        {/* League Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveLeague('argentina')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeLeague === 'argentina'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            🇦🇷 Liga Argentina
          </button>
          <button
            onClick={() => setActiveLeague('mundial')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeLeague === 'mundial'
                ? 'bg-gradient-to-r from-[#f1c40f] to-[#f39c12] text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            ⭐ Mundial
          </button>
        </div>

        {/* Matches */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Próximos partidos</h3>

          {matches.map((match) => (
            <Card key={match.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-400">
                  <p>{match.round}</p>
                  <p>{match.date} - {match.time}</p>
                  {match.group && <p className="text-[#f1c40f]">{match.group}</p>}
                </div>
                {match.league === 'mundial' && (
                  <Star size={16} className="text-[#f1c40f]" />
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <p className="font-bold">{match.homeTeam}</p>
                </div>
                <div className="px-3 text-gray-400 font-bold">VS</div>
                <div className="flex-1 text-center">
                  <p className="font-bold">{match.awayTeam}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handlePrediction(match.id, 'home')}
                  className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                    predictions[match.id] === 'home'
                      ? 'bg-[#2ecc71] text-white ring-2 ring-[#2ecc71]'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  Local
                  <div className="text-xs">{match.odds.home.toFixed(2)}</div>
                </button>

                <button
                  onClick={() => handlePrediction(match.id, 'draw')}
                  className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                    predictions[match.id] === 'draw'
                      ? 'bg-[#f1c40f] text-black ring-2 ring-[#f1c40f]'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  Empate
                  <div className="text-xs">{match.odds.draw.toFixed(2)}</div>
                </button>

                <button
                  onClick={() => handlePrediction(match.id, 'away')}
                  className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                    predictions[match.id] === 'away'
                      ? 'bg-[#3498db] text-white ring-2 ring-[#3498db]'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  Visitante
                  <div className="text-xs">{match.odds.away.toFixed(2)}</div>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-lg font-bold mb-3">Tabla de posiciones</h3>
          <Card className="p-4">
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center gap-3 pb-3 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1
                        ? 'bg-gradient-to-br from-[#f1c40f] to-[#f39c12] text-black'
                        : player.rank === 2
                        ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black'
                        : player.rank === 3
                        ? 'bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white'
                        : 'bg-white/10'
                    }`}
                  >
                    {player.rank}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-gray-400">{player.accuracy}% aciertos</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#2ecc71]">{player.points}</p>
                    <p className="text-xs text-gray-400">puntos</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <BottomNav activeSection="matches" onNavigate={onNavigate} />
    </div>
  );
}
