import { EloRank } from '../types';

export const ELO_RANKS: EloRank[] = [
  // Bronze
  { name: 'Bronce 1', tier: 1, minElo: 500, maxElo: 599, color: '#CD7F32', icon: 'Shield', category: 'bronze', description: 'Iniciando tu camino' },
  { name: 'Bronce 2', tier: 2, minElo: 600, maxElo: 699, color: '#CD7F32', icon: 'Shield', category: 'bronze', description: 'Aprendiendo lo básico' },
  { name: 'Bronce 3', tier: 3, minElo: 700, maxElo: 799, color: '#CD7F32', icon: 'Shield', category: 'bronze', description: 'Dominando fundamentos' },
  
  // Silver
  { name: 'Plata 1', tier: 4, minElo: 800, maxElo: 899, color: '#C0C0C0', icon: 'Medal', category: 'silver', description: 'Jugador competente' },
  { name: 'Plata 2', tier: 5, minElo: 900, maxElo: 999, color: '#C0C0C0', icon: 'Medal', category: 'silver', description: 'Habilidad en desarrollo' },
  { name: 'Plata 3', tier: 6, minElo: 1000, maxElo: 1099, color: '#C0C0C0', icon: 'Medal', category: 'silver', description: 'Jugador sólido' },
  
  // Gold
  { name: 'Oro 1', tier: 7, minElo: 1100, maxElo: 1199, color: '#FFD700', icon: 'Star', category: 'gold', description: 'Jugador experimentado' },
  { name: 'Oro 2', tier: 8, minElo: 1200, maxElo: 1299, color: '#FFD700', icon: 'Star', category: 'gold', description: 'Habilidad sobresaliente' },
  { name: 'Oro 3', tier: 9, minElo: 1300, maxElo: 1399, color: '#FFD700', icon: 'Star', category: 'gold', description: 'Elite en desarrollo' },
  
  // Platinum
  { name: 'Platino 1', tier: 10, minElo: 1400, maxElo: 1499, color: '#E5E4E2', icon: 'Award', category: 'platinum', description: 'Jugador excepcional' },
  { name: 'Platino 2', tier: 11, minElo: 1500, maxElo: 1599, color: '#E5E4E2', icon: 'Award', category: 'platinum', description: 'Habilidad superior' },
  { name: 'Platino 3', tier: 12, minElo: 1600, maxElo: 1699, color: '#E5E4E2', icon: 'Award', category: 'platinum', description: 'Casi diamante' },
  
  // Diamond
  { name: 'Diamante 1', tier: 13, minElo: 1700, maxElo: 1799, color: '#B9F2FF', icon: 'Gem', category: 'diamond', description: 'Jugador brillante' },
  { name: 'Diamante 2', tier: 14, minElo: 1800, maxElo: 1899, color: '#B9F2FF', icon: 'Gem', category: 'diamond', description: 'Maestría técnica' },
  { name: 'Diamante 3', tier: 15, minElo: 1900, maxElo: 1999, color: '#B9F2FF', icon: 'Gem', category: 'diamond', description: 'Entre los mejores' },
  
  // Elite
  { name: 'Maestro', tier: 16, minElo: 2000, maxElo: 2199, color: '#9C27B0', icon: 'Trophy', category: 'elite', description: 'Maestro del juego' },
  { name: 'Gran Maestro', tier: 17, minElo: 2200, maxElo: 2399, color: '#7B1FA2', icon: 'Trophy', category: 'elite', description: 'Habilidad extraordinaria' },
  { name: 'Challenger', tier: 18, minElo: 2400, maxElo: 2599, color: '#6A1B9A', icon: 'Crown', category: 'elite', description: 'Desafiante de leyendas' },
  { name: 'Leyenda', tier: 19, minElo: 2600, maxElo: 9999, color: '#4A148C', icon: 'Crown', category: 'elite', description: 'Leyenda viviente' },
];

export function getRankFromElo(elo: number): EloRank {
  return ELO_RANKS.find(rank => elo >= rank.minElo && elo <= rank.maxElo) || ELO_RANKS[0];
}

export function calculateEloChange(playerElo: number, opponentElo: number, won: boolean, kFactor: number = 32): number {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  const actualScore = won ? 1 : 0;
  return Math.round(kFactor * (actualScore - expectedScore));
}

export function getTeamAverageElo(players: { elo: number }[]): number {
  if (players.length === 0) return 0;
  const sum = players.reduce((acc, player) => acc + player.elo, 0);
  return Math.round(sum / players.length);
}

export function getProgressInRank(elo: number, rank: EloRank): number {
  const range = rank.maxElo - rank.minElo;
  const progress = elo - rank.minElo;
  return Math.min(100, Math.max(0, (progress / range) * 100));
}
