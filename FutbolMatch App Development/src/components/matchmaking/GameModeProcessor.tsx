import React, { useState, useEffect } from 'react';
import { Loader2, X, Check, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GameMode, MatchFormat, MatchmakingFilters, Player } from '../../types';
import { MOCK_PLAYERS } from '../../data/mockData';
import { motion } from 'motion/react';

type SearchStage = 'searching' | 'found' | 'negotiating' | 'confirmed';

interface GameModeProcessorProps {
  mode: GameMode;
  format: MatchFormat;
  filters: MatchmakingFilters;
  onCancel: () => void;
  onMatchFound: (matchData: any) => void;
}

export function GameModeProcessor({
  mode,
  format,
  filters,
  onCancel,
  onMatchFound
}: GameModeProcessorProps) {
  const [stage, setStage] = useState<SearchStage>('searching');
  const [progress, setProgress] = useState(0);
  const [opponent, setOpponent] = useState<Player | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 'searching') {
        // Find opponent
        const filteredPlayers = MOCK_PLAYERS.filter(
          (p) =>
            p.elo >= filters.eloRange[0] &&
            p.elo <= filters.eloRange[1] &&
            (p.distance || 0) <= filters.maxDistance
        );
        const randomOpponent =
          filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)] ||
          MOCK_PLAYERS[0];
        setOpponent(randomOpponent);
        setStage('found');
        setProgress(33);
      } else if (stage === 'found') {
        setStage('negotiating');
        setProgress(66);
      } else if (stage === 'negotiating') {
        setStage('confirmed');
        setProgress(100);
      } else if (stage === 'confirmed') {
        // Redirect to confirmation
        setTimeout(() => {
          onMatchFound({
            opponent,
            format,
            mode,
            date: '2026-01-12',
            time: '18:00',
            location: 'Polideportivo Norte, Palermo',
            price: 300,
            duration: format === '5v5' ? 50 : format === '7v7' ? 70 : 90
          });
        }, 1500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [stage]);

  const getStageInfo = () => {
    switch (stage) {
      case 'searching':
        return {
          icon: <Loader2 className="animate-spin" size={48} />,
          title: 'Buscando oponentes...',
          description: 'Analizando jugadores cercanos con ELO similar'
        };
      case 'found':
        return {
          icon: <Users size={48} className="text-[#2ecc71]" />,
          title: '¡Oponente encontrado!',
          description: `${opponent?.name} - ${opponent?.elo} ELO - ${opponent?.distance}km`
        };
      case 'negotiating':
        return {
          icon: <Loader2 className="animate-spin text-[#f1c40f]" size={48} />,
          title: 'Negociando detalles...',
          description: 'Confirmando cancha, horario y precio'
        };
      case 'confirmed':
        return {
          icon: <Check size={48} className="text-[#2ecc71]" />,
          title: '¡Partido confirmado!',
          description: 'Redirigiendo a la confirmación del partido...'
        };
    }
  };

  const stageInfo = getStageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center space-y-6">
          {/* Cancel button */}
          {stage !== 'confirmed' && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          )}

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex justify-center"
          >
            {stageInfo.icon}
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-bold">{stageInfo.title}</h2>
          <p className="text-gray-400">{stageInfo.description}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60]"
            />
          </div>

          {/* Progress percentage */}
          <p className="text-sm text-gray-400">{progress}% completado</p>

          {/* Opponent Card (when found) */}
          {opponent && stage !== 'searching' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-full flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold">{opponent.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{opponent.elo} ELO</span>
                      <span>•</span>
                      <span>{opponent.distance}km</span>
                      <span>•</span>
                      <span>{opponent.winRate}% WR</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Cancel button (bottom) */}
          {stage === 'searching' && (
            <Button variant="danger" fullWidth onClick={onCancel}>
              Cancelar búsqueda
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
