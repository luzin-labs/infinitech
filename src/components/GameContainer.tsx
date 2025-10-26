'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import Canvas from './Canvas';
import Palette from './Palette';
import ResetModal from './ResetModal';
import { useGameStore } from '@/store/gameStore';
import { getTotalDiscoverableCount } from '@/data/recipes';

export default function GameContainer() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const discoveredElements = useGameStore((state) => state.discoveredElements);
  const clearCanvas = useGameStore((state) => state.clearCanvas);

  const totalDiscoverable = getTotalDiscoverableCount();
  const discoveredCount = discoveredElements.length;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-[#1a1a1a] border-b border-[#e0e0e0] dark:border-[#3a3a3a] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-bold text-black dark:text-white tracking-tight">
            INFINITECH
          </h1>
          <div className="bg-[#f5f5f5] dark:bg-[#252525] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-md px-4 py-2 flex flex-col space-y-0.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#999] dark:text-[#666]">
              DISCOVERED
            </div>
            <div className="text-[16px] font-bold text-black dark:text-white">
              {discoveredCount}/{totalDiscoverable}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 bg-[#f5f5f5] dark:bg-[#252525] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-md hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f] transition-colors flex items-center justify-center cursor-pointer text-xl"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 rounded-md border border-[#e0e0e0] dark:border-[#3a3a3a] text-black dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#252525] font-medium text-sm transition-all"
          >
            Clear Canvas
          </button>
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="px-4 py-2 rounded-md border border-[#d32f2f] dark:border-[#ff5252] text-[#d32f2f] dark:text-[#ff5252] hover:bg-[#fef2f2] dark:hover:bg-[#2a1a1a] font-medium text-sm transition-all"
          >
            Reset Progress
          </button>
        </div>
      </header>

      {/* Canvas Area */}
      <div className="flex-1 relative" data-canvas>
        <Canvas />
      </div>

      {/* Palette */}
      <Palette />

      {/* Reset Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
