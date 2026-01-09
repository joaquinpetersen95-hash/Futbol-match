import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MobileHeader } from '../navigation/MobileHeader';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface PostMatchProps {
  matchData: any;
  onComplete: () => void;
}

export function PostMatch({ matchData, onComplete }: PostMatchProps) {
  const [step, setStep] = useState<'rating' | 'success'>('rating');
  const [overall, setOverall] = useState(0);
  const [technique, setTechnique] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [fairPlay, setFairPlay] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [review, setReview] = useState('');

  const ratingCategories = [
    { id: 'technique', label: 'Técnica', value: technique, setter: setTechnique, icon: '⚽' },
    { id: 'teamwork', label: 'Trabajo en equipo', value: teamwork, setter: setTeamwork, icon: '🤝' },
    { id: 'fairPlay', label: 'Fair Play', value: fairPlay, setter: setFairPlay, icon: '🏅' },
    { id: 'punctuality', label: 'Puntualidad', value: punctuality, setter: setPunctuality, icon: '⏰' }
  ];

  const getRatingText = (rating: number) => {
    if (rating === 0) return 'Sin calificar';
    if (rating === 1) return 'Muy malo';
    if (rating === 2) return 'Malo';
    if (rating === 3) return 'Regular';
    if (rating === 4) return 'Bueno';
    return 'Excelente';
  };

  const handleSubmit = () => {
    if (overall === 0) {
      toast.error('Por favor califica el partido');
      return;
    }

    toast.success('¡Gracias por tu calificación!');
    setStep('success');
  };

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

          <h2 className="text-3xl font-bold mb-4">¡Gracias!</h2>
          <p className="text-gray-400 mb-8">
            Tu reseña nos ayuda a mejorar la experiencia de todos los jugadores.
          </p>

          <Button fullWidth onClick={onComplete}>
            Continuar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <MobileHeader title="Calificar Partido" />

      <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
        {/* Match Info */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Partido completado</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <p className="font-bold">{matchData?.opponent?.name || 'Oponente'}</p>
              <div className="text-sm text-gray-400">
                <p>{matchData?.format} - {matchData?.mode}</p>
                <p>{matchData?.date} - {matchData?.location}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Overall Rating */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Calificación general</h3>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setOverall(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={40}
                  className={`${
                    star <= overall ? 'fill-[#f1c40f] text-[#f1c40f]' : 'text-gray-600'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">{getRatingText(overall)}</p>
        </Card>

        {/* Specific Ratings */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Calificaciones específicas</h3>
          <div className="space-y-4">
            {ratingCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <span>{category.icon}</span>
                    {category.label}
                  </label>
                  <span className="text-xs text-gray-400">{getRatingText(category.value)}</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => category.setter(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= category.value
                            ? 'fill-[#2ecc71] text-[#2ecc71]'
                            : 'text-gray-600'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Written Review */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Reseña (opcional)</h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Comparte tu experiencia del partido..."
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent resize-none"
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-gray-400 mt-2">{review.length}/500 caracteres</p>
        </Card>

        {/* Submit Button */}
        <Button fullWidth size="lg" onClick={handleSubmit}>
          Enviar calificación
        </Button>
      </div>
    </div>
  );
}
