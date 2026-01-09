import React from 'react';
import { Trophy, Shield, Medal, Star, Award, Gem, Crown } from 'lucide-react';
import { getRankFromElo, getProgressInRank } from '../../utils/eloSystem';

interface EloRankBadgeProps {
  elo: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EloRankBadge({ elo, showProgress = false, size = 'md' }: EloRankBadgeProps) {
  const rank = getRankFromElo(elo);
  const progress = getProgressInRank(elo, rank);
  
  const iconMap: Record<string, React.ElementType> = {
    Shield,
    Medal,
    Star,
    Award,
    Trophy,
    Gem,
    Crown
  };
  
  const Icon = iconMap[rank.icon] || Shield;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };
  
  return (
    <div className="inline-block">
      <div
        className={`inline-flex items-center gap-2 rounded-full font-bold ${sizeClasses[size]}`}
        style={{
          background: `linear-gradient(135deg, ${rank.color}dd 0%, ${rank.color}99 100%)`,
          boxShadow: `0 0 20px ${rank.color}44`
        }}
      >
        <Icon size={iconSizes[size]} />
        <span>{rank.name}</span>
        <span className="opacity-80">({elo})</span>
      </div>
      
      {showProgress && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>{rank.minElo}</span>
            <span className="font-semibold">{progress.toFixed(0)}%</span>
            <span>{rank.maxElo}</span>
          </div>
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${rank.color} 0%, ${rank.color}dd 100%)`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
