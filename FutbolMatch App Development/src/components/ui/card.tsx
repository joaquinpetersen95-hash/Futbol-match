import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: boolean;
}

export function Card({ children, className = '', onClick, gradient = true }: CardProps) {
  const baseClasses = 'rounded-xl p-4 backdrop-blur-sm';
  const gradientClass = gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-white/5';
  const clickableClass = onClick ? 'cursor-pointer hover:from-white/15 hover:to-white/10 transition-all' : '';
  
  return (
    <div
      className={`${baseClasses} ${gradientClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
