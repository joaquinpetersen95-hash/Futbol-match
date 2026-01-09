import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'primary', size = 'md', className = '' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-[#2ecc71] text-white',
    secondary: 'bg-gray-700 text-white',
    gold: 'bg-gradient-to-r from-[#f1c40f] to-[#f39c12] text-black',
    danger: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
