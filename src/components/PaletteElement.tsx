'use client';

import { getCategoryColor } from '@/data/categories';
import { useGameStore } from '@/store/gameStore';
import { v4 as uuidv4 } from 'uuid';

interface PaletteElementProps {
  name: string;
  category: string;
  isNew?: boolean;
}

export default function PaletteElement({ name, category, isNew }: PaletteElementProps) {
  const addCanvasElement = useGameStore((state) => state.addCanvasElement);
  const removeNewBadge = useGameStore((state) => state.removeNewBadge);

  const handleDragStart = (e: React.DragEvent) => {
    // Get canvas position to place element at cursor
    const canvas = document.querySelector('[data-canvas]');
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create new canvas element
    const newElement = {
      id: uuidv4(),
      name,
      category,
      x,
      y,
    };

    addCanvasElement(newElement);

    // Remove "New!" badge on first drag
    if (isNew) {
      removeNewBadge(name);
    }

    // Store element ID for potential cleanup
    e.dataTransfer.setData('elementId', newElement.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const backgroundColor = getCategoryColor(category);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="relative inline-flex cursor-grab active:cursor-grabbing"
    >
      <div
        className="px-4 py-2 rounded-2xl font-medium text-sm text-white shadow-md hover:shadow-lg transition-shadow"
        style={{ backgroundColor }}
      >
        {name}
      </div>
      {isNew && (
        <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow">
          New!
        </span>
      )}
    </div>
  );
}
