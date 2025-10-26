'use client';

import { useState } from 'react';
import Canvas from './Canvas';
import Palette from './Palette';
import ResetModal from './ResetModal';
import { useGameStore } from '@/store/gameStore';
import { getTotalDiscoverableCount } from '@/data/recipes';

export default function GameContainer() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const discoveredElements = useGameStore((state) => state.discoveredElements);
  const clearCanvas = useGameStore((state) => state.clearCanvas);

  const totalDiscoverable = getTotalDiscoverableCount();
  const discoveredCount = discoveredElements.length;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            INFINITECH
          </h1>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {discoveredCount}/{totalDiscoverable} discovered
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
            style={{ borderRadius: '3px' }}
          >
            Clear Canvas
          </button>
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors text-sm"
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
