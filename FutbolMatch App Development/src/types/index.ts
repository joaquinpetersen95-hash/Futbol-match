// Core Types
export type GameMode = 'competitive' | 'casual' | 'private' | 'tournament';
export type MatchFormat = '5v5' | '7v7' | '11v11';
export type UserRole = 'player' | 'captain';

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  club: string;
  jerseyNumber: number;
  elo: number;
  role: UserRole;
  avatar?: string;
  coins: number;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  founded: number;
  members: number;
  avgElo: number;
  wins: number;
  losses: number;
  trophies: string[];
  topPlayers: Player[];
}

// ELO Ranking Types
export interface EloRank {
  name: string;
  tier: number;
  minElo: number;
  maxElo: number;
  color: string;
  icon: string;
  category: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'elite';
  description: string;
}

// Player Types
export interface Player {
  id: string;
  name: string;
  elo: number;
  position: string;
  club: string;
  distance?: number;
  winRate: number;
  matchesPlayed: number;
  age?: number;
  isOnline?: boolean;
  lastSeen?: string;
}

// Match Types
export interface Match {
  id: string;
  format: MatchFormat;
  mode: GameMode;
  date: string;
  time: string;
  location: string;
  duration: number;
  price: number;
  opponent?: Player;
  team1?: Player[];
  team2?: Player[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  eloChange?: number;
}

// Matchmaking Types
export interface MatchmakingFilters {
  maxDistance: number;
  eloRange: [number, number];
  genderMix: boolean;
  onlineOnly: boolean;
  timePreference: 'morning' | 'afternoon' | 'night' | 'any';
  priceRange: [number, number];
}

export type MatchmakingStage = 'searching' | 'found' | 'negotiating' | 'confirmed';

// Captain Types
export interface CaptainMatch {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: number;
  description: string;
  eloMin: number;
  eloMax: number;
  format: MatchFormat;
  team1: Player[];
  team2: Player[];
}

// Checkout Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'card' | 'mercadopago' | 'transfer' | 'cash';

// Prode Types
export interface ProdeMatch {
  id: string;
  league: 'argentina' | 'mundial';
  round: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  group?: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface ProdePrediction {
  matchId: string;
  prediction: 'home' | 'draw' | 'away';
}

export interface ProdeStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
  points: number;
  rank: number;
}

// Post-Match Types
export interface PostMatchRating {
  overall: number;
  technique: number;
  teamwork: number;
  fairPlay: number;
  punctuality: number;
  review?: string;
}

// Store Types
export type ProductRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'premium' | 'cosmetic' | 'booster';
  rarity?: ProductRarity;
  description: string;
  features?: string[];
  icon: string;
  popular?: boolean;
}

// Private Match Types
export interface Friend {
  id: string;
  name: string;
  username: string;
  elo: number;
  isOnline: boolean;
  lastSeen: string;
  matchesPlayedTogether: number;
  winRateTogether: number;
}

export interface PrivateInvitation {
  id: string;
  from: Player;
  mode: GameMode;
  hasWager: boolean;
  wagerAmount?: number;
  message: string;
  timestamp: string;
  location: string;
}

// Suspension Types
export interface Suspension {
  captainId: string;
  suspensionCount: number;
  currentSuspensionEnd?: string;
  suspensionHistory: {
    date: string;
    duration: number;
    reason: string;
  }[];
}

// Ranking Types
export interface ClubRanking {
  rank: number;
  club: string;
  avgElo: number;
  members: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface AgeRanking {
  rank: number;
  player: string;
  age: number;
  elo: number;
  club: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface ZoneRanking {
  rank: number;
  zone: string;
  avgElo: number;
  players: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}
