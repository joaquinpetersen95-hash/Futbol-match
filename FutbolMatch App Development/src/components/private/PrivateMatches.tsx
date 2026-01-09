import React, { useState } from 'react';
import { UserPlus, Copy, Check, Trophy, Coffee, DollarSign, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MobileHeader } from '../navigation/MobileHeader';
import { EloRankBadge } from '../rankings/EloRankBadge';
import { MOCK_FRIENDS, MOCK_INVITATIONS } from '../../data/mockData';
import { GameMode } from '../../types';
import { toast } from 'sonner@2.0.3';

interface PrivateMatchesProps {
  onBack: () => void;
  onMatchConfirm: (matchData: any) => void;
}

export function PrivateMatches({ onBack, onMatchConfirm }: PrivateMatchesProps) {
  const [activeTab, setActiveTab] = useState<'invite' | 'code' | 'pending'>('invite');
  const [inviteCode, setInviteCode] = useState('FM' + Math.random().toString(36).substr(2, 4).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [selectedMode, setSelectedMode] = useState<Record<string, GameMode>>({});
  const [wagerEnabled, setWagerEnabled] = useState<Record<string, boolean>>({});
  const [wagerAmount, setWagerAmount] = useState<Record<string, number>>({});

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinByCode = () => {
    if (codeInput.length >= 4) {
      toast.success('Buscando partido...');
      // Mock: redirect to match confirmation
    } else {
      toast.error('Código inválido');
    }
  };

  const handleSendInvite = (friendId: string) => {
    const mode = selectedMode[friendId] || 'casual';
    const hasWager = wagerEnabled[friendId] || false;
    const amount = wagerAmount[friendId] || 0;

    toast.success('Invitación enviada');
  };

  const handleAcceptInvite = (invitation: typeof MOCK_INVITATIONS[0]) => {
    toast.success('Invitación aceptada');
    // Mock: redirect to match confirmation
    onMatchConfirm({
      opponent: invitation.from,
      format: '5v5',
      mode: invitation.mode,
      date: '2026-01-12',
      time: '18:00',
      location: invitation.location,
      price: invitation.wagerAmount || 300,
      duration: 50
    });
  };

  const handleRejectInvite = (invitationId: string) => {
    toast.info('Invitación rechazada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <MobileHeader title="Partidos Privados" onBack={onBack} />

      <div className="p-4 space-y-6 max-w-md mx-auto pb-8">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('invite')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'invite'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Invitar Amigos
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'code'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Por Código
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`relative flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-[#2ecc71] text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Pendientes
            {MOCK_INVITATIONS.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {MOCK_INVITATIONS.length}
              </div>
            )}
          </button>
        </div>

        {/* Invite Friends Tab */}
        {activeTab === 'invite' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Tus amigos</h3>

            {MOCK_FRIENDS.map((friend) => (
              <Card key={friend.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
                      👤
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                        friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{friend.name}</p>
                    <p className="text-xs text-gray-400">{friend.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <EloRankBadge elo={friend.elo} size="sm" />
                    </div>
                  </div>

                  <div className="text-right text-xs text-gray-400">
                    <p>{friend.isOnline ? 'En línea' : friend.lastSeen}</p>
                    <p>{friend.matchesPlayedTogether} partidos juntos</p>
                    <p>{friend.winRateTogether}% WR</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  {/* Mode Selection */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSelectedMode({ ...selectedMode, [friend.id]: 'competitive' })
                      }
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        selectedMode[friend.id] === 'competitive'
                          ? 'bg-[#e74c3c] text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <Trophy size={14} />
                      Con ELO
                    </button>
                    <button
                      onClick={() =>
                        setSelectedMode({ ...selectedMode, [friend.id]: 'casual' })
                      }
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        !selectedMode[friend.id] || selectedMode[friend.id] === 'casual'
                          ? 'bg-[#2ecc71] text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <Coffee size={14} />
                      Sin ELO
                    </button>
                  </div>

                  {/* Wager Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-400">Incluir apuesta</label>
                    <button
                      onClick={() =>
                        setWagerEnabled({ ...wagerEnabled, [friend.id]: !wagerEnabled[friend.id] })
                      }
                      className={`w-12 h-6 rounded-full transition-all ${
                        wagerEnabled[friend.id] ? 'bg-[#2ecc71]' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-all ${
                          wagerEnabled[friend.id] ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Wager Amount */}
                  {wagerEnabled[friend.id] && (
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Monto de la apuesta: ${wagerAmount[friend.id] || 100}
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={wagerAmount[friend.id] || 100}
                        onChange={(e) =>
                          setWagerAmount({ ...wagerAmount, [friend.id]: Number(e.target.value) })
                        }
                        className="w-full accent-[#2ecc71]"
                      />
                    </div>
                  )}

                  <Button
                    fullWidth
                    size="sm"
                    onClick={() => handleSendInvite(friend.id)}
                    disabled={!friend.isOnline}
                  >
                    <UserPlus size={16} className="inline mr-2" />
                    Enviar Invitación
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Join by Code Tab */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            {/* My Code */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Tu código de invitación</h3>
              <p className="text-sm text-gray-400 mb-4">
                Comparte este código con tus amigos para que se unan a tu partido
              </p>

              <div className="flex gap-2">
                <div className="flex-1 bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold tracking-wider">{inviteCode}</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="w-12 h-12 bg-[#2ecc71] hover:bg-[#27ae60] rounded-lg flex items-center justify-center transition-colors"
                >
                  {copied ? <Check size={24} /> : <Copy size={24} />}
                </button>
              </div>
            </Card>

            {/* Join Code */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Unirse con código</h3>
              <p className="text-sm text-gray-400 mb-4">
                Ingresa el código de invitación de tu amigo
              </p>

              <div className="space-y-3">
                <Input
                  placeholder="Ingresa el código"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  maxLength={8}
                />
                <Button fullWidth onClick={handleJoinByCode}>
                  Unirse al Partido
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Pending Invitations Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">
              Invitaciones pendientes ({MOCK_INVITATIONS.length})
            </h3>

            {MOCK_INVITATIONS.map((invitation) => (
              <Card key={invitation.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
                    👤
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">{invitation.from.name}</p>
                    <EloRankBadge elo={invitation.from.elo} size="sm" />
                  </div>

                  <div className="text-right text-xs text-gray-400">
                    <p>{invitation.timestamp}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    {invitation.mode === 'competitive' ? (
                      <Trophy size={16} className="text-[#e74c3c]" />
                    ) : (
                      <Coffee size={16} className="text-[#2ecc71]" />
                    )}
                    <span className="text-gray-400">
                      {invitation.mode === 'competitive' ? 'Competitivo' : 'Casual'}
                    </span>
                  </div>

                  {invitation.hasWager && (
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-[#f1c40f]" />
                      <span className="text-gray-400">Apuesta: ${invitation.wagerAmount}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#3498db]" />
                    <span className="text-gray-400">{invitation.location}</span>
                  </div>
                </div>

                {invitation.message && (
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-300">"{invitation.message}"</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    fullWidth
                    size="sm"
                    onClick={() => handleAcceptInvite(invitation)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    fullWidth
                    size="sm"
                    variant="danger"
                    onClick={() => handleRejectInvite(invitation.id)}
                  >
                    Rechazar
                  </Button>
                </div>
              </Card>
            ))}

            {MOCK_INVITATIONS.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-400">No tienes invitaciones pendientes</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
