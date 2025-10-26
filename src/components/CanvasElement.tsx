'use client';

import { useState, useRef } from 'react';
import { CanvasElement as CanvasElementType } from '@/types/game';
import { getCategoryColor } from '@/data/categories';
import { getElementIcon } from '@/data/elementIcons';
import { useGameStore } from '@/store/gameStore';

interface CanvasElementProps {
  element: CanvasElementType;
  onDragMove?: (id: string, x: number, y: number) => void;
}

export default function CanvasElement({ element, onDragMove }: CanvasElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: element.x, y: element.y });

  const updatePosition = useGameStore((state) => state.updateCanvasElementPosition);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { x: element.x, y: element.y };

    // Capture pointer to receive events even if cursor leaves element
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    const newX = elementStartPos.current.x + deltaX;
    const newY = elementStartPos.current.y + deltaY;

    // Call onDragMove for real-time collision detection
    if (onDragMove) {
      onDragMove(element.id, newX, newY);
    }

    // Update position in store
    updatePosition(element.id, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const backgroundColor = getCategoryColor(element.category);
  const icon = getElementIcon(element.name);

  return (
    <div
      id={element.id}
      className="absolute select-none"
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className={`px-5 py-2.5 rounded-[20px] font-medium text-sm text-white ${
          isDragging ? 'shadow-lg' : 'shadow-sm'
        }`}
        style={{
          backgroundColor,
        }}
      >
        {icon && <span>{icon} </span>}
        {element.name}
      </div>
    </div>
  );
}
