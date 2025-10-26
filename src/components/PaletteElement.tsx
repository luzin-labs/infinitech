'use client';

import { useState, useRef } from 'react';
import { getCategoryColor } from '@/data/categories';
import { useGameStore } from '@/store/gameStore';
import { v4 as uuidv4 } from 'uuid';

interface PaletteElementProps {
  name: string;
  category: string;
  isNew?: boolean;
}

export default function PaletteElement({ name, category, isNew }: PaletteElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const createdElementId = useRef<string | null>(null);

  const addCanvasElement = useGameStore((state) => state.addCanvasElement);
  const updatePosition = useGameStore((state) => state.updateCanvasElementPosition);
  const removeNewBadge = useGameStore((state) => state.removeNewBadge);

  const handlePointerDown = (e: React.PointerEvent) => {
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

    // Store the new element's ID and drag start position
    createdElementId.current = newElement.id;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);

    // Capture pointer to track events even if it leaves element
    e.currentTarget.setPointerCapture(e.pointerId);

    // Remove "New!" badge on first drag
    if (isNew) {
      removeNewBadge(name);
    }

    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !createdElementId.current) return;

    // Get canvas position for new coordinates
    const canvas = document.querySelector('[data-canvas]');
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    // Update the created element's position
    updatePosition(createdElementId.current, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    createdElementId.current = null;
  };

  const backgroundColor = getCategoryColor(category);

  return (
    <div
      className="relative inline-flex"
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="px-4 py-2 font-medium text-sm text-white shadow-md hover:shadow-lg transition-shadow"
        style={{ backgroundColor, borderRadius: '3px' }}
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
