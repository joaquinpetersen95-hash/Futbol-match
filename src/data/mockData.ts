import { Player, Club, ProdeMatch, Friend, PrivateInvitation, StoreProduct, ClubRanking, AgeRanking, ZoneRanking } from '../types';

// Mock Players
export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Santiago Ruiz', elo: 1250, position: 'Delantero', club: 'River Plate', distance: 2.3, winRate: 65, matchesPlayed: 45, age: 22 },
  { id: '2', name: 'Mateo González', elo: 1190, position: 'Mediocampista', club: 'Boca Juniors', distance: 3.1, winRate: 58, matchesPlayed: 38, age: 21 },
  { id: '3', name: 'Lucas Fernández', elo: 1310, position: 'Defensor', club: 'Racing Club', distance: 1.8, winRate: 72, matchesPlayed: 52, age: 23 },
  { id: '4', name: 'Tomás Martínez', elo: 1220, position: 'Arquero', club: 'Independiente', distance: 4.5, winRate: 61, matchesPlayed: 41, age: 22 },
  { id: '5', name: 'Joaquín López', elo: 1280, position: 'Delantero', club: 'San Lorenzo', distance: 2.9, winRate: 68, matchesPlayed: 47, age: 21 },
  { id: '6', name: 'Franco Silva', elo: 1195, position: 'Mediocampista', club: 'River Plate', distance: 3.7, winRate: 59, matchesPlayed: 40, age: 23 },
  { id: '7', name: 'Valentín Romero', elo: 1265, position: 'Defensor', club: 'Boca Juniors', distance: 2.1, winRate: 64, matchesPlayed: 44, age: 22 },
  { id: '8', name: 'Agustín Torres', elo: 1240, position: 'Mediocampista', club: 'Racing Club', distance: 3.4, winRate: 62, matchesPlayed: 43, age: 21 },
  { id: '9', name: 'Nicolás Díaz', elo: 1300, position: 'Delantero', club: 'Independiente', distance: 1.5, winRate: 70, matchesPlayed: 50, age: 23 },
  { id: '10', name: 'Bautista Morales', elo: 1210, position: 'Defensor', club: 'San Lorenzo', distance: 4.2, winRate: 60, matchesPlayed: 39, age: 22 },
  { id: '11', name: 'Lautaro Castro', elo: 1290, position: 'Mediocampista', club: 'River Plate', distance: 2.6, winRate: 67, matchesPlayed: 48, age: 21 },
  { id: '12', name: 'Thiago Sánchez', elo: 1230, position: 'Delantero', club: 'Boca Juniors', distance: 3.8, winRate: 63, matchesPlayed: 42, age: 23 },
  { id: '13', name: 'Facundo Benítez', elo: 1270, position: 'Arquero', club: 'Racing Club', distance: 2.4, winRate: 66, matchesPlayed: 46, age: 22 },
  { id: '14', name: 'Maximiliano Vega', elo: 1200, position: 'Defensor', club: 'Independiente', distance: 3.9, winRate: 57, matchesPlayed: 37, age: 21 },
  { id: '15', name: 'Rodrigo Herrera', elo: 1320, position: 'Mediocampista', club: 'San Lorenzo', distance: 1.9, winRate: 73, matchesPlayed: 53, age: 23 },
  { id: '16', name: 'Ezequiel Molina', elo: 1245, position: 'Delantero', club: 'River Plate', distance: 3.2, winRate: 64, matchesPlayed: 44, age: 22 },
  { id: '17', name: 'Ignacio Pereyra', elo: 1215, position: 'Mediocampista', club: 'Boca Juniors', distance: 4.1, winRate: 61, matchesPlayed: 40, age: 21 },
  { id: '18', name: 'Benjamín Ríos', elo: 1285, position: 'Defensor', club: 'Racing Club', distance: 2.7, winRate: 69, matchesPlayed: 49, age: 23 },
  { id: '19', name: 'Emiliano Flores', elo: 1225, position: 'Arquero', club: 'Independiente', distance: 3.5, winRate: 62, matchesPlayed: 41, age: 22 },
  { id: '20', name: 'Ian Medina', elo: 1295, position: 'Delantero', club: 'San Lorenzo', distance: 2.2, winRate: 68, matchesPlayed: 47, age: 21 },
  { id: '21', name: 'Dylan Ortiz', elo: 1260, position: 'Mediocampista', club: 'River Plate', distance: 3.6, winRate: 65, matchesPlayed: 45, age: 23 },
  { id: '22', name: 'Kevin Navarro', elo: 1340, position: 'Defensor', club: 'Boca Juniors', distance: 1.6, winRate: 75, matchesPlayed: 55, age: 22 },
];

// Mock Clubs
export const MOCK_CLUBS: Record<string, Club> = {
  'River Plate': {
    id: 'river',
    name: 'River Plate',
    colors: { primary: '#FF0000', secondary: '#FFFFFF' },
    founded: 1901,
    members: 1245,
    avgElo: 1265,
    wins: 1876,
    losses: 543,
    trophies: ['Copa Libertadores 2018', 'Superliga 2021', 'Copa Argentina 2019'],
    topPlayers: MOCK_PLAYERS.filter(p => p.club === 'River Plate').slice(0, 3)
  },
  'Boca Juniors': {
    id: 'boca',
    name: 'Boca Juniors',
    colors: { primary: '#003399', secondary: '#FFCC00' },
    founded: 1905,
    members: 1567,
    avgElo: 1278,
    wins: 1932,
    losses: 521,
    trophies: ['Copa Libertadores 2007', 'Superliga 2020', 'Copa de la Liga 2020'],
    topPlayers: MOCK_PLAYERS.filter(p => p.club === 'Boca Juniors').slice(0, 3)
  },
  'Racing Club': {
    id: 'racing',
    name: 'Racing Club',
    colors: { primary: '#00BFFF', secondary: '#FFFFFF' },
    founded: 1903,
    members: 892,
    avgElo: 1252,
    wins: 1654,
    losses: 612,
    trophies: ['Superliga 2019', 'Trofeo de Campeones 2019'],
    topPlayers: MOCK_PLAYERS.filter(p => p.club === 'Racing Club').slice(0, 3)
  },
  'Independiente': {
    id: 'independiente',
    name: 'Independiente',
    colors: { primary: '#CC0000', secondary: '#FFFFFF' },
    founded: 1905,
    members: 745,
    avgElo: 1238,
    wins: 1523,
    losses: 687,
    trophies: ['Copa Sudamericana 2017'],
    topPlayers: MOCK_PLAYERS.filter(p => p.club === 'Independiente').slice(0, 3)
  },
  'San Lorenzo': {
    id: 'sanlorenzo',
    name: 'San Lorenzo',
    colors: { primary: '#000080', secondary: '#FF0000' },
    founded: 1908,
    members: 623,
    avgElo: 1245,
    wins: 1432,
    losses: 734,
    trophies: ['Copa Libertadores 2014', 'Torneo Inicial 2013'],
    topPlayers: MOCK_PLAYERS.filter(p => p.club === 'San Lorenzo').slice(0, 3)
  },
};

// Mock Prode Matches
export const MOCK_PRODE_MATCHES: ProdeMatch[] = [
  // Liga Argentina
  { id: '1', league: 'argentina', round: 'Fecha 15', date: '2026-01-10', time: '18:00', homeTeam: 'Boca Juniors', awayTeam: 'River Plate', odds: { home: 2.4, draw: 3.1, away: 2.9 } },
  { id: '2', league: 'argentina', round: 'Fecha 15', date: '2026-01-10', time: '20:30', homeTeam: 'Racing Club', awayTeam: 'Independiente', odds: { home: 2.1, draw: 3.2, away: 3.5 } },
  { id: '3', league: 'argentina', round: 'Fecha 16', date: '2026-01-12', time: '19:00', homeTeam: 'San Lorenzo', awayTeam: 'Boca Juniors', odds: { home: 3.2, draw: 3.0, away: 2.3 } },
  { id: '4', league: 'argentina', round: 'Fecha 16', date: '2026-01-13', time: '21:00', homeTeam: 'River Plate', awayTeam: 'Racing Club', odds: { home: 2.0, draw: 3.3, away: 3.8 } },
  
  // Mundial
  { id: '5', league: 'mundial', round: 'Fase de Grupos', date: '2026-06-14', time: '15:00', homeTeam: 'Argentina', awayTeam: 'Brasil', group: 'Grupo A', odds: { home: 2.2, draw: 3.0, away: 3.3 } },
  { id: '6', league: 'mundial', round: 'Fase de Grupos', date: '2026-06-15', time: '18:00', homeTeam: 'España', awayTeam: 'Italia', group: 'Grupo B', odds: { home: 2.5, draw: 3.1, away: 2.8 } },
  { id: '7', league: 'mundial', round: 'Fase de Grupos', date: '2026-06-16', time: '12:00', homeTeam: 'Francia', awayTeam: 'Alemania', group: 'Grupo C', odds: { home: 2.3, draw: 3.2, away: 3.0 } },
];

// Mock Friends
export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Martín Pérez',
    username: '@martinp',
    elo: 1280,
    isOnline: true,
    lastSeen: 'Ahora',
    matchesPlayedTogether: 12,
    winRateTogether: 75
  },
  {
    id: 'f2',
    name: 'Lucas Gómez',
    username: '@lucasg',
    elo: 1195,
    isOnline: false,
    lastSeen: 'Hace 2 horas',
    matchesPlayedTogether: 8,
    winRateTogether: 62
  },
  {
    id: 'f3',
    name: 'Diego Ramírez',
    username: '@diegor',
    elo: 1320,
    isOnline: true,
    lastSeen: 'Ahora',
    matchesPlayedTogether: 15,
    winRateTogether: 80
  }
];

// Mock Private Invitations
export const MOCK_INVITATIONS: PrivateInvitation[] = [
  {
    id: 'inv1',
    from: MOCK_PLAYERS[0],
    mode: 'competitive',
    hasWager: true,
    wagerAmount: 500,
    message: '¿Jugamos un partido competitivo? Tengo una cancha reservada.',
    timestamp: 'Hace 5 min',
    location: 'Cancha La Bombonera, Palermo'
  },
  {
    id: 'inv2',
    from: MOCK_PLAYERS[2],
    mode: 'casual',
    hasWager: false,
    message: 'Armamos un picado casual este sábado',
    timestamp: 'Hace 15 min',
    location: 'Polideportivo Norte, Belgrano'
  }
];

// Mock Store Products
export const MOCK_STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'premium-30',
    name: 'Premium 30 días',
    price: 299,
    originalPrice: 599,
    category: 'premium',
    description: 'Acceso premium por 30 días',
    features: ['Estadísticas avanzadas', 'Partidos ilimitados', 'Sin publicidad', 'Soporte prioritario'],
    icon: 'Crown',
    popular: true
  },
  {
    id: 'premium-90',
    name: 'Premium 3 meses',
    price: 799,
    originalPrice: 1797,
    category: 'premium',
    description: '3 meses de acceso premium',
    features: ['Todo lo de Premium 30 días', '2 meses adicionales gratis', 'Acceso beta a nuevas funciones'],
    icon: 'Crown',
    popular: true
  },
  {
    id: 'jersey-gold',
    name: 'Camiseta Especial',
    price: 150,
    category: 'cosmetic',
    rarity: 'legendary',
    description: 'Diseño dorado exclusivo',
    icon: 'Shirt',
  },
  {
    id: 'captain-badge',
    name: 'Insignia de Capitán',
    price: 200,
    category: 'cosmetic',
    rarity: 'epic',
    description: 'Badge especial de capitán',
    icon: 'Shield'
  },
  {
    id: 'victory-celebration',
    name: 'Celebración Victoria',
    price: 100,
    category: 'cosmetic',
    rarity: 'rare',
    description: 'Animación especial al ganar',
    icon: 'Trophy'
  },
  {
    id: 'goal-effect',
    name: 'Efecto de Gol',
    price: 75,
    category: 'cosmetic',
    rarity: 'common',
    description: 'Partículas doradas',
    icon: 'Sparkles'
  }
];

// Mock Club Rankings
export const MOCK_CLUB_RANKINGS: ClubRanking[] = [
  { rank: 1, club: 'Boca Juniors', avgElo: 1278, members: 1567, trend: 'up', change: 23 },
  { rank: 2, club: 'River Plate', avgElo: 1265, members: 1245, trend: 'up', change: 15 },
  { rank: 3, club: 'Racing Club', avgElo: 1252, members: 892, trend: 'down', change: -8 },
  { rank: 4, club: 'San Lorenzo', avgElo: 1245, members: 623, trend: 'stable', change: 0 },
  { rank: 5, club: 'Independiente', avgElo: 1238, members: 745, trend: 'down', change: -12 },
  { rank: 6, club: 'Estudiantes', avgElo: 1225, members: 534, trend: 'up', change: 7 },
  { rank: 7, club: 'Vélez Sarsfield', avgElo: 1210, members: 467, trend: 'stable', change: 0 },
  { rank: 8, club: 'Newells', avgElo: 1198, members: 389, trend: 'down', change: -5 },
];

// Mock Age Rankings
export const MOCK_AGE_RANKINGS: AgeRanking[] = [
  { rank: 1, player: 'Kevin Navarro', age: 22, elo: 1340, club: 'Boca Juniors', trend: 'up', change: 28 },
  { rank: 2, player: 'Rodrigo Herrera', age: 23, elo: 1320, club: 'San Lorenzo', trend: 'up', change: 22 },
  { rank: 3, player: 'Lucas Fernández', age: 23, elo: 1310, club: 'Racing Club', trend: 'stable', change: 0 },
  { rank: 4, player: 'Nicolás Díaz', age: 23, elo: 1300, club: 'Independiente', trend: 'up', change: 15 },
  { rank: 5, player: 'Ian Medina', age: 21, elo: 1295, club: 'San Lorenzo', trend: 'up', change: 18 },
  { rank: 6, player: 'Lautaro Castro', age: 21, elo: 1290, club: 'River Plate', trend: 'down', change: -7 },
  { rank: 7, player: 'Benjamín Ríos', age: 23, elo: 1285, club: 'Racing Club', trend: 'stable', change: 0 },
  { rank: 8, player: 'Joaquín López', age: 21, elo: 1280, club: 'San Lorenzo', trend: 'up', change: 12 },
];

// Mock Zone Rankings
export const MOCK_ZONE_RANKINGS: ZoneRanking[] = [
  { rank: 1, zone: 'Palermo', avgElo: 1285, players: 234, trend: 'up', change: 12 },
  { rank: 2, zone: 'Villa Crespo', avgElo: 1272, players: 189, trend: 'up', change: 8 },
  { rank: 3, zone: 'Belgrano', avgElo: 1265, players: 201, trend: 'stable', change: 0 },
  { rank: 4, zone: 'Caballito', avgElo: 1258, players: 167, trend: 'down', change: -5 },
  { rank: 5, zone: 'Núñez', avgElo: 1250, players: 156, trend: 'up', change: 6 },
  { rank: 6, zone: 'Almagro', avgElo: 1242, players: 143, trend: 'stable', change: 0 },
  { rank: 7, zone: 'Flores', avgElo: 1235, players: 128, trend: 'down', change: -9 },
  { rank: 8, zone: 'Boedo', avgElo: 1228, players: 112, trend: 'down', change: -4 },
];
