'use client';

import { useState, useRef } from 'react';
import { getCategoryColor } from '@/data/categories';
import { getElementIcon } from '@/data/elementIcons';
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

  const categoryColor = getCategoryColor(category);
  const icon = getElementIcon(name);

  // Get lighter shade for dark mode text
  const getLighterShade = (color: string) => {
    // Simple color lightening for dark mode
    const colorMap: Record<string, string> = {
      '#3b82f6': '#60a5fa', // blue -> lighter blue
      '#8b5cf6': '#a78bfa', // purple -> lighter purple
      '#10b981': '#34d399', // green -> lighter green
      '#f59e0b': '#fbbf24', // amber -> lighter amber
      '#ef4444': '#f87171', // red -> lighter red
    };
    return colorMap[color] || color;
  };

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
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] font-medium text-[13px] transition-all duration-200 select-none hover:-translate-y-0.5 hover:shadow-md ${
          isDragging ? 'scale-95' : ''
        }`}
        style={{
          backgroundColor: `${categoryColor}10`,
          color: categoryColor,
        }}
      >
        {icon && <span className="text-[16px]">{icon}</span>}
        <span>{name}</span>
      </div>
      {isNew && (
        <span className="absolute -top-1 -right-1 bg-[#22c55e] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full">
          NEW
        </span>
      )}
    </div>
  );
}
