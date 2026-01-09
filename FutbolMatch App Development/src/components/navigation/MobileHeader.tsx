import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  onBack?: () => void;
  showNotifications?: boolean;
  notificationCount?: number;
}

export function MobileHeader({ 
  title = 'FutbolMatch', 
  onBack, 
  showNotifications = false,
  notificationCount = 0 
}: MobileHeaderProps) {
  return (
    <div className="sticky top-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-white/10 z-40">
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          {!onBack && (
            <div className="w-8 h-8 bg-[#2ecc71] rounded-full flex items-center justify-center">
              <span className="text-lg">⚽</span>
            </div>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        {showNotifications && (
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <Bell size={24} />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {notificationCount}
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
