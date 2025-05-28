"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, User, Settings, Sparkles, Users } from 'lucide-react';
// Add custom CSS for animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 300ms ease-out forwards;
  }
`;

export default function StarWeaverHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuItems = [
    { name: 'My Stories', icon: BookOpen, position: { angle: 120, distance: 120 } },
    { name: 'Community', icon: Users, position: { angle: 80, distance: 120 } },
    { name: 'Profile', icon: User, position: { angle: 170, distance: 120 } },  
    { name: 'Settings', icon: Settings, position: { angle: 40, distance: 130 } },
  ];

  const getMenuItemPosition = (angle, distance) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * distance,
      y: Math.sin(radian) * distance,
    };
  };

  const handleMenuItemClick = (itemName) => {
    console.log(`Navigate to ${itemName}`);
    const linkmap = new Map([
      ['My Stories', 'myStories'],
      ['Community', 'Community'],
      ['Profile', 'Profile'],
      ['Settings', 'Settings'],
    ]);
    setIsMenuOpen(false);
    router.push(`/${linkmap.get(itemName)}`);
  };

  return (
    <>
      <style>{styles}</style>
      
      {/* Radial gradient overlay - creates spotlight effect around star */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30 transition-all duration-500"
          style={{
            background: `radial-gradient(circle 300px at calc(100% - 60px) 60px, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.8) 100%)`
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Header with Star Menu */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-slate-700 via-stone-600 to-slate-800 bg-clip-text text-transparent">
                StarWeaver
              </h1>
              <p className="text-xs text-slate-600/80 uppercase tracking-wide">Story Generator</p>
            </div>
            
            {/* Star Navigation Menu */}
            <div className="relative z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative group"
              >
                <div className={`p-4 bg-gradient-to-r rounded-full shadow-lg transition-all duration-300 ${
                  isMenuOpen 
                    ? 'scale-125 shadow-2xl ring-4 ring-indigo-300/70 from-indigo-600 to-purple-600 brightness-110' 
                    : 'from-slate-600 to-stone-600 group-hover:scale-110 group-hover:shadow-xl group-hover:from-indigo-500 group-hover:to-purple-500'
                }`}>
                  <Sparkles className={`w-6 h-6 text-white transition-all duration-300 drop-shadow-lg ${
                    isMenuOpen ? 'rotate-180' : 'group-hover:rotate-45'
                  }`} />
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'animate-ping scale-150' : 'animate-pulse group-hover:scale-125'
                }`}></div>
                
                {/* Radial glow effect when menu is open */}
                {isMenuOpen && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 blur-3xl opacity-80 scale-300 animate-pulse"></div>
                )}
              </button>
              
              {/* Radial Menu */}
              {isMenuOpen && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                  {menuItems.map((item, index) => {
                    const position = getMenuItemPosition(item.position.angle, item.position.distance);
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="absolute animate-fadeIn"
                        style={{
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                          animationDelay: `${index * 50}ms`,
                          animationDuration: '300ms',
                          animationFillMode: 'both'
                        }}
                      >
                        {/* Menu Item */}
                        <button 
                          className="relative group bg-white backdrop-blur-sm border-2 border-slate-200 rounded-full p-4 shadow-2xl hover:shadow-3xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 ring-2 ring-white brightness-110"
                          onClick={() => handleMenuItemClick(item.name)}
                        >
                          <Icon className="w-6 h-6 text-slate-700 group-hover:text-indigo-600 transition-colors drop-shadow-sm" />
                          
                          {/* Menu item glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200/40 to-purple-200/40 opacity-0 group-hover:opacity-100 transition-opacity blur-lg scale-150"></div>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border border-slate-700">
                            {item.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}