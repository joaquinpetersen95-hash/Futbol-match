import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Users, Trophy, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EloRankBadge } from '../rankings/EloRankBadge';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

type ConfirmationStep = 'details' | 'confirming' | 'success';

interface MatchConfirmationProps {
  matchData: any;
  onConfirm: () => void;
  onBack: () => void;
}

export function MatchConfirmation({ matchData, onConfirm, onBack }: MatchConfirmationProps) {
  const [step, setStep] = useState<ConfirmationStep>('details');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'confirming') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('success');
            toast.success('¡Partido confirmado exitosamente!');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [step]);

  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <p className="text-gray-400">No hay datos del partido</p>
          <Button className="mt-4" onClick={onBack}>
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 'confirming') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-full flex items-center justify-center"
          >
            <Check size={40} className="text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">Confirmando partido...</h2>
          <p className="text-gray-400 mb-6">Procesando tu reserva</p>

          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60]"
            />
          </div>
          <p className="text-sm text-gray-400">{progress}%</p>
        </Card>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-full flex items-center justify-center"
          >
            <Check size={48} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">¡Partido Confirmado!</h2>
          <p className="text-gray-400 mb-8">
            Tu partido ha sido reservado exitosamente. Te enviamos un email con todos los detalles.
          </p>

          <div className="space-y-3 mb-8">
            <Card className="p-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={20} className="text-[#2ecc71]" />
                <div>
                  <p className="text-gray-400">Fecha</p>
                  <p className="font-semibold">{matchData.date}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Clock size={20} className="text-[#2ecc71]" />
                <div>
                  <p className="text-gray-400">Hora</p>
                  <p className="font-semibold">{matchData.time}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={20} className="text-[#2ecc71]" />
                <div>
                  <p className="text-gray-400">Ubicación</p>
                  <p className="font-semibold">{matchData.location}</p>
                </div>
              </div>
            </Card>
          </div>

          <Button fullWidth onClick={onConfirm}>
            Continuar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="p-4 space-y-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Confirmación de Partido</h1>
        </div>

        {/* Match Type Badge */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={24} className="text-[#f1c40f]" />
            <div>
              <p className="text-sm text-gray-400">Tipo de partido</p>
              <p className="font-bold capitalize">{matchData.mode}</p>
            </div>
          </div>
        </Card>

        {/* Opponent Info */}
        {matchData.opponent && (
          <Card className="p-4">
            <h3 className="font-bold mb-3">Oponente</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{matchData.opponent.name}</p>
                <EloRankBadge elo={matchData.opponent.elo} size="sm" />
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                  <span>{matchData.opponent.winRate}% WR</span>
                  <span>•</span>
                  <span>{matchData.opponent.distance}km</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Match Details */}
        <Card className="p-4 space-y-4">
          <h3 className="font-bold mb-3">Detalles del partido</h3>

          <div className="flex items-center gap-3">
            <Users size={20} className="text-[#2ecc71]" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Formato</p>
              <p className="font-semibold">{matchData.format}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-[#2ecc71]" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Fecha y hora</p>
              <p className="font-semibold">
                {matchData.date} - {matchData.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-[#2ecc71]" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Ubicación</p>
              <p className="font-semibold">{matchData.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#2ecc71]" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Duración</p>
              <p className="font-semibold">{matchData.duration} minutos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-[#f1c40f]" />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Precio por jugador</p>
              <p className="font-semibold text-xl">${matchData.price}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth size="lg" onClick={() => setStep('confirming')}>
            Confirmar y Proceder al Pago
          </Button>
          <Button fullWidth size="lg" variant="ghost" onClick={onBack}>
            Cancelar
          </Button>
        </div>

        {/* Info */}
        <Card className="p-4 bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            💡 Cancelación gratuita hasta 24 horas antes del partido
          </p>
        </Card>
      </div>
    </div>
  );
}
