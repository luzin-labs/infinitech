'use client';

import { useGameStore } from '@/store/gameStore';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetModal({ isOpen, onClose }: ResetModalProps) {
  const resetProgress = useGameStore((state) => state.resetProgress);

  if (!isOpen) return null;

  const handleReset = () => {
    resetProgress();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Reset All Progress?
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">
          This will clear all discovered elements and canvas progress. This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-none bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-none bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
