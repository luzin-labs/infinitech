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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        className="bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-lg shadow-xl p-6 max-w-[400px] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Reset Progress
        </h2>
        <p className="text-[14px] text-[#666] dark:text-[#999] mb-6">
          Are you sure? This will delete all discovered elements and progress.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md border border-[#e0e0e0] dark:border-[#3a3a3a] text-black dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#252525] font-medium text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md border border-[#d32f2f] dark:border-[#ff5252] text-[#d32f2f] dark:text-[#ff5252] hover:bg-[#fef2f2] dark:hover:bg-[#2a1a1a] font-medium text-sm transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
