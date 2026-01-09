import React, { useState } from 'react';
import { Check, Users, Calendar, MapPin, DollarSign, Shuffle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MobileHeader } from '../navigation/MobileHeader';
import { EloRankBadge } from '../rankings/EloRankBadge';
import { MOCK_PLAYERS } from '../../data/mockData';
import { MatchFormat, Player } from '../../types';
import { getTeamAverageElo } from '../../utils/eloSystem';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface CaptainTeamBuilderProps {
  userElo: number;
  onBack: () => void;
  onComplete: () => void;
}

type BuilderStep = 'verify' | 'create' | 'select' | 'confirm';

export function CaptainTeamBuilder({ userElo, onBack, onComplete }: CaptainTeamBuilderProps) {
  const [step, setStep] = useState<BuilderStep>('verify');
  const [format, setFormat] = useState<MatchFormat>('5v5');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('300');
  const [description, setDescription] = useState('');
  const [eloMin, setEloMin] = useState('1000');
  const [eloMax, setEloMax] = useState('1500');
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);

  const MIN_CAPTAIN_ELO = 1200;
  const canBeCaptain = userElo >= MIN_CAPTAIN_ELO;

  const playersPerTeam = format === '5v5' ? 5 : format === '7v7' ? 7 : 11;
  const availablePlayers = MOCK_PLAYERS.filter(
    (p) =>
      p.elo >= parseInt(eloMin) &&
      p.elo <= parseInt(eloMax) &&
      !team1.find((t) => t.id === p.id) &&
      !team2.find((t) => t.id === p.id)
  );

  const handleAddToTeam = (player: Player, team: 1 | 2) => {
    if (team === 1 && team1.length < playersPerTeam) {
      setTeam1([...team1, player]);
    } else if (team === 2 && team2.length < playersPerTeam) {
      setTeam2([...team2, player]);
    } else {
      toast.error(`El equipo ${team} ya está completo`);
    }
  };

  const handleRemoveFromTeam = (playerId: string, team: 1 | 2) => {
    if (team === 1) {
      setTeam1(team1.filter((p) => p.id !== playerId));
    } else {
      setTeam2(team2.filter((p) => p.id !== playerId));
    }
  };

  const handleAutoBalance = () => {
    const allPlayers = [...team1, ...team2, ...availablePlayers.slice(0, playersPerTeam * 2 - team1.length - team2.length)];
    const sorted = [...allPlayers].sort((a, b) => b.elo - a.elo);

    const newTeam1: Player[] = [];
    const newTeam2: Player[] = [];

    // Distribute players alternately to balance ELO
    sorted.forEach((player, index) => {
      if (index % 2 === 0 && newTeam1.length < playersPerTeam) {
        newTeam1.push(player);
      } else if (newTeam2.length < playersPerTeam) {
        newTeam2.push(player);
      } else if (newTeam1.length < playersPerTeam) {
        newTeam1.push(player);
      }
    });

    setTeam1(newTeam1);
    setTeam2(newTeam2);
    toast.success('Equipos balanceados automáticamente');
  };

  const handleCreateMatch = () => {
    if (!title || !location || !date || !time) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    setStep('select');
  };

  const handleConfirmTeams = () => {
    if (team1.length !== playersPerTeam || team2.length !== playersPerTeam) {
      toast.error(`Cada equipo debe tener ${playersPerTeam} jugadores`);
      return;
    }
    setStep('confirm');
  };

  const handleFinalConfirm = () => {
    toast.success('¡Partido creado exitosamente!');
    onComplete();
  };

  // Verify Step
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <MobileHeader title="Crear Partido como Capitán" onBack={onBack} />

        <div className="p-4 flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md p-8 text-center">
            {canBeCaptain ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#f1c40f] to-[#f39c12] rounded-full flex items-center justify-center"
                >
                  <Check size={48} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-4">¡Cumples los requisitos!</h2>
                <p className="text-gray-400 mb-6">
                  Tu ELO de {userElo} te permite crear partidos como capitán
                </p>

                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-2">Como capitán podrás:</p>
                  <div className="space-y-2 text-sm text-left">
                    <p>✓ Crear partidos personalizados</p>
                    <p>✓ Seleccionar jugadores manualmente</p>
                    <p>✓ Balancear equipos automáticamente</p>
                    <p>✓ Establecer requisitos de ELO</p>
                  </div>
                </div>

                <Button fullWidth size="lg" onClick={() => setStep('create')}>
                  Crear Partido
                </Button>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">❌</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">ELO Insuficiente</h2>
                <p className="text-gray-400 mb-6">
                  Necesitas al menos {MIN_CAPTAIN_ELO} de ELO para ser capitán.
                  <br />
                  Tu ELO actual: {userElo}
                </p>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-300">
                    Continúa jugando para aumentar tu ELO y desbloquear esta función
                  </p>
                </div>

                <Button fullWidth variant="ghost" onClick={onBack}>
                  Volver
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Create Step
  if (step === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <MobileHeader title="Crear Partido - Paso 2/4" onBack={() => setStep('verify')} />

        <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
          <Card className="p-4">
            <h3 className="font-bold mb-4">Detalles del partido</h3>

            <div className="space-y-4">
              <Input
                label="Título del partido"
                placeholder="Ej: Picado del sábado"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                label="Ubicación"
                placeholder="Nombre de la cancha"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Fecha"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <Input
                  label="Hora"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <Input
                label="Precio por jugador"
                type="number"
                placeholder="300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Formato
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['5v5', '7v7', '11v11'] as MatchFormat[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`py-2 rounded-lg font-semibold transition-all ${
                        format === f
                          ? 'bg-[#2ecc71] text-white'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="ELO mínimo"
                  type="number"
                  value={eloMin}
                  onChange={(e) => setEloMin(e.target.value)}
                />

                <Input
                  label="ELO máximo"
                  type="number"
                  value={eloMax}
                  onChange={(e) => setEloMax(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Información adicional..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] resize-none"
                  rows={3}
                />
              </div>

              <Button fullWidth size="lg" onClick={handleCreateMatch}>
                Continuar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Select Step
  if (step === 'select') {
    const team1Avg = getTeamAverageElo(team1);
    const team2Avg = getTeamAverageElo(team2);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <MobileHeader title="Seleccionar Jugadores - Paso 3/4" onBack={() => setStep('create')} />

        <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
          {/* Teams Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
              <h3 className="font-bold mb-2">Equipo 1</h3>
              <p className="text-3xl font-bold text-blue-400">{team1.length}/{playersPerTeam}</p>
              {team1.length > 0 && (
                <p className="text-sm text-gray-400 mt-2">ELO Promedio: {team1Avg}</p>
              )}
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
              <h3 className="font-bold mb-2">Equipo 2</h3>
              <p className="text-3xl font-bold text-red-400">{team2.length}/{playersPerTeam}</p>
              {team2.length > 0 && (
                <p className="text-sm text-gray-400 mt-2">ELO Promedio: {team2Avg}</p>
              )}
            </Card>
          </div>

          <Button
            fullWidth
            variant="secondary"
            onClick={handleAutoBalance}
            className="flex items-center justify-center gap-2"
          >
            <Shuffle size={20} />
            Auto Balance
          </Button>

          {/* Available Players */}
          <div>
            <h3 className="font-bold mb-3">Jugadores disponibles ({availablePlayers.length})</h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availablePlayers.map((player) => (
                <Card key={player.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
                      👤
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{player.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{player.elo} ELO</span>
                        <span>•</span>
                        <span>{player.position}</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAddToTeam(player, 1)}
                        disabled={team1.length >= playersPerTeam}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-xs font-semibold transition-colors"
                      >
                        E1
                      </button>
                      <button
                        onClick={() => handleAddToTeam(player, 2)}
                        disabled={team2.length >= playersPerTeam}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-xs font-semibold transition-colors"
                      >
                        E2
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleConfirmTeams}
            disabled={team1.length !== playersPerTeam || team2.length !== playersPerTeam}
          >
            Confirmar Equipos
          </Button>
        </div>
      </div>
    );
  }

  // Confirm Step
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <MobileHeader title="Confirmar - Paso 4/4" onBack={() => setStep('select')} />

      <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
        <Card className="p-4">
          <h3 className="font-bold mb-3">Resumen del partido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Título:</span>
              <span className="font-semibold">{title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ubicación:</span>
              <span className="font-semibold">{location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fecha:</span>
              <span className="font-semibold">{date} {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Formato:</span>
              <span className="font-semibold">{format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Precio:</span>
              <span className="font-semibold">${price}</span>
            </div>
          </div>
        </Card>

        {/* Team 1 */}
        <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
          <h3 className="font-bold mb-3">Equipo 1 (ELO: {getTeamAverageElo(team1)})</h3>
          <div className="space-y-2">
            {team1.map((player) => (
              <div key={player.id} className="flex items-center justify-between text-sm">
                <span>{player.name}</span>
                <span className="text-gray-400">{player.elo} ELO</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Team 2 */}
        <Card className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
          <h3 className="font-bold mb-3">Equipo 2 (ELO: {getTeamAverageElo(team2)})</h3>
          <div className="space-y-2">
            {team2.map((player) => (
              <div key={player.id} className="flex items-center justify-between text-sm">
                <span>{player.name}</span>
                <span className="text-gray-400">{player.elo} ELO</span>
              </div>
            ))}
          </div>
        </Card>

        <Button fullWidth size="lg" onClick={handleFinalConfirm}>
          Crear Partido
        </Button>
      </div>
    </div>
  );
}
