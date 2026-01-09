import React, { useState } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { AuthScreen } from './components/auth/AuthScreen';
import { MobileHome } from './components/home/MobileHome';
import { Matchmaking } from './components/matchmaking/Matchmaking';
import { MatchConfirmation } from './components/match/MatchConfirmation';
import { CheckoutScreen } from './components/checkout/CheckoutScreen';
import { PostMatch } from './components/post-match/PostMatch';
import { ProdeSection } from './components/prode/ProdeSection';
import { RankingsSection } from './components/rankings/RankingsSection';
import { ClubSection } from './components/club/ClubSection';
import { StoreSection } from './components/store/StoreSection';
import { PrivateMatches } from './components/private/PrivateMatches';
import { SettingsSection } from './components/settings/SettingsSection';
import { CaptainTeamBuilder } from './components/captain/CaptainTeamBuilder';
import { User, GameMode } from './types';

type AppScreen =
  | 'auth'
  | 'home'
  | 'matchmaking'
  | 'confirmation'
  | 'checkout'
  | 'post-match'
  | 'prode'
  | 'rankings'
  | 'club'
  | 'store'
  | 'private'
  | 'settings'
  | 'captain'
  | 'matches'
  | 'history'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('auth');
  const [user, setUser] = useState<User>({
    id: '1',
    username: 'Usuario',
    email: 'user@futbolmatch.com',
    club: 'River Plate',
    jerseyNumber: 10,
    elo: 1250,
    role: 'player',
    coins: 1500
  });
  const [selectedMode, setSelectedMode] = useState<GameMode>('casual');
  const [matchData, setMatchData] = useState<any>(null);

  const handleLogin = (username: string) => {
    setUser({ ...user, username });
    setCurrentScreen('home');
  };

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);

    if (mode === 'private') {
      setCurrentScreen('private');
    } else if (user.role === 'captain' && mode === 'competitive') {
      setCurrentScreen('captain');
    } else {
      setCurrentScreen('matchmaking');
    }
  };

  const handleMatchFound = (data: any) => {
    setMatchData(data);
    setCurrentScreen('confirmation');
  };

  const handleMatchConfirmed = () => {
    setCurrentScreen('checkout');
  };

  const handleCheckoutComplete = () => {
    setCurrentScreen('post-match');
  };

  const handlePostMatchComplete = () => {
    setCurrentScreen('home');
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'prode':
        setCurrentScreen('prode');
        break;
      case 'rankings':
        setCurrentScreen('rankings');
        break;
      case 'club':
        setCurrentScreen('club');
        break;
      case 'store':
        setCurrentScreen('store');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'private':
        setCurrentScreen('private');
        break;
      case 'matches':
        // Same as home for now
        setCurrentScreen('home');
        break;
      case 'history':
        // Could implement history screen
        setCurrentScreen('home');
        break;
      case 'profile':
        setCurrentScreen('settings');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const handleRoleToggle = (role: 'player' | 'captain') => {
    setUser({ ...user, role });
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser({ ...user, ...updates });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;

      case 'home':
        return (
          <MobileHome
            user={user}
            onNavigate={handleNavigate}
            onModeSelect={handleModeSelect}
            onRoleToggle={handleRoleToggle}
          />
        );

      case 'matchmaking':
        return (
          <Matchmaking
            mode={selectedMode}
            onBack={() => setCurrentScreen('home')}
            onMatchFound={handleMatchFound}
          />
        );

      case 'confirmation':
        return (
          <MatchConfirmation
            matchData={matchData}
            onConfirm={handleMatchConfirmed}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'checkout':
        return (
          <CheckoutScreen
            matchData={matchData}
            onComplete={handleCheckoutComplete}
            onBack={() => setCurrentScreen('confirmation')}
          />
        );

      case 'post-match':
        return (
          <PostMatch
            matchData={matchData}
            onComplete={handlePostMatchComplete}
          />
        );

      case 'prode':
        return <ProdeSection onNavigate={handleNavigate} />;

      case 'rankings':
        return <RankingsSection onNavigate={handleNavigate} />;

      case 'club':
        return <ClubSection user={user} onNavigate={handleNavigate} />;

      case 'store':
        return <StoreSection user={user} onNavigate={handleNavigate} />;

      case 'private':
        return (
          <PrivateMatches
            onBack={() => setCurrentScreen('home')}
            onMatchConfirm={handleMatchFound}
          />
        );

      case 'settings':
        return (
          <SettingsSection
            user={user}
            onNavigate={handleNavigate}
            onUpdateUser={handleUpdateUser}
          />
        );

      case 'captain':
        return (
          <CaptainTeamBuilder
            userElo={user.elo}
            onBack={() => setCurrentScreen('home')}
            onComplete={() => setCurrentScreen('home')}
          />
        );

      default:
        return (
          <MobileHome
            user={user}
            onNavigate={handleNavigate}
            onModeSelect={handleModeSelect}
            onRoleToggle={handleRoleToggle}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {renderScreen()}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }
        }}
      />
    </div>
  );
}
