import React, { useState } from 'react';
import { MapPin, Signal, Users, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MobileHeader } from '../navigation/MobileHeader';
import { GameMode, MatchFormat, MatchmakingFilters } from '../../types';
import { GameModeProcessor } from './GameModeProcessor';

interface MatchmakingProps {
  mode: GameMode;
  onBack: () => void;
  onMatchFound: (matchData: any) => void;
}

export function Matchmaking({ mode, onBack, onMatchFound }: MatchmakingProps) {
  const [format, setFormat] = useState<MatchFormat>('5v5');
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState<MatchmakingFilters>({
    maxDistance: 5,
    eloRange: [1000, 1500],
    genderMix: mode !== 'competitive',
    onlineOnly: true,
    timePreference: 'any',
    priceRange: [0, 1000]
  });

  const formats: { id: MatchFormat; players: string; duration: string }[] = [
    { id: '5v5', players: '5 vs 5', duration: '50 min' },
    { id: '7v7', players: '7 vs 7', duration: '70 min' },
    { id: '11v11', players: '11 vs 11', duration: '90 min' }
  ];

  const getModeConfig = () => {
    switch (mode) {
      case 'competitive':
        return {
          name: 'Competitivo',
          color: '#e74c3c',
          affectsElo: true,
          requiresElo: true,
          forceSameGender: true
        };
      case 'casual':
        return {
          name: 'Casual',
          color: '#2ecc71',
          affectsElo: false,
          requiresElo: false,
          forceSameGender: false
        };
      case 'private':
        return {
          name: 'Privado',
          color: '#3498db',
          affectsElo: false,
          requiresElo: false,
          forceSameGender: false
        };
      default:
        return {
          name: 'Torneo',
          color: '#9b59b6',
          affectsElo: true,
          requiresElo: true,
          forceSameGender: false
        };
    }
  };

  const modeConfig = getModeConfig();

  if (searching) {
    return (
      <GameModeProcessor
        mode={mode}
        format={format}
        filters={filters}
        onCancel={() => setSearching(false)}
        onMatchFound={onMatchFound}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <MobileHeader
        title={`Matchmaking - ${modeConfig.name}`}
        onBack={onBack}
      />

      <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
        {/* Mode Info */}
        <Card className="p-4">
          <div
            className="inline-block px-4 py-2 rounded-full font-bold mb-2"
            style={{ backgroundColor: modeConfig.color + '33', color: modeConfig.color }}
          >
            {modeConfig.name}
          </div>
          <div className="space-y-2 text-sm">
            {modeConfig.affectsElo && (
              <p className="text-gray-400">✓ Afecta ranking ELO</p>
            )}
            {modeConfig.forceSameGender && (
              <p className="text-gray-400">✓ Mismo género obligatorio</p>
            )}
            {!modeConfig.affectsElo && (
              <p className="text-gray-400">✓ Solo diversión, no afecta ranking</p>
            )}
          </div>
        </Card>

        {/* Format Selection */}
        <div>
          <h3 className="text-lg font-bold mb-3">Formato del partido</h3>
          <div className="grid grid-cols-3 gap-3">
            {formats.map((f) => (
              <Card
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`p-4 text-center cursor-pointer transition-all ${
                  format === f.id
                    ? 'ring-2 ring-[#2ecc71] bg-[#2ecc71]/20'
                    : 'hover:bg-white/10'
                }`}
              >
                <p className="font-bold text-lg">{f.players}</p>
                <p className="text-xs text-gray-400">{f.duration}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Filtros de búsqueda</h3>

          {/* Distance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} />
                Distancia máxima
              </label>
              <span className="text-sm font-semibold">{filters.maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full accent-[#2ecc71]"
            />
          </div>

          {/* ELO Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <Signal size={16} />
                Rango de ELO
              </label>
              <span className="text-sm font-semibold">
                {filters.eloRange[0]} - {filters.eloRange[1]}
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="range"
                min="500"
                max="3000"
                value={filters.eloRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    eloRange: [Number(e.target.value), filters.eloRange[1]]
                  })
                }
                className="w-full accent-[#2ecc71]"
              />
              <input
                type="range"
                min="500"
                max="3000"
                value={filters.eloRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    eloRange: [filters.eloRange[0], Number(e.target.value)]
                  })
                }
                className="w-full accent-[#2ecc71]"
              />
            </div>
          </div>

          {/* Gender Mix */}
          {!modeConfig.forceSameGender && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} />
                Género mixto
              </label>
              <button
                onClick={() => setFilters({ ...filters, genderMix: !filters.genderMix })}
                className={`w-12 h-6 rounded-full transition-all ${
                  filters.genderMix ? 'bg-[#2ecc71]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all ${
                    filters.genderMix ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Online Only */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <Signal size={16} />
              Solo jugadores en línea
            </label>
            <button
              onClick={() => setFilters({ ...filters, onlineOnly: !filters.onlineOnly })}
              className={`w-12 h-6 rounded-full transition-all ${
                filters.onlineOnly ? 'bg-[#2ecc71]' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all ${
                  filters.onlineOnly ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Time Preference */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Clock size={16} />
              Preferencia de horario
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['any', 'morning', 'afternoon', 'night'] as const).map((time) => (
                <button
                  key={time}
                  onClick={() => setFilters({ ...filters, timePreference: time })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    filters.timePreference === time
                      ? 'bg-[#2ecc71] text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {time === 'any' && 'Cualquiera'}
                  {time === 'morning' && 'Mañana'}
                  {time === 'afternoon' && 'Tarde'}
                  {time === 'night' && 'Noche'}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <DollarSign size={16} />
                Rango de precio
              </label>
              <span className="text-sm font-semibold">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [0, Number(e.target.value)]
                })
              }
              className="w-full accent-[#2ecc71]"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          fullWidth
          size="lg"
          onClick={() => setSearching(true)}
          className="mt-6"
        >
          Buscar Partido
        </Button>
      </div>
    </div>
  );
}
