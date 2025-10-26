'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import CanvasElement from './CanvasElement';
import { checkCollision, getMidpoint } from '@/utils/collision';
import { getRecipe } from '@/data/recipes';
import {
  playMergeAnimation,
  playShakeAnimation,
  playAppearAnimation,
  MERGE_ANIMATION_DURATION,
} from '@/utils/animations';
import { v4 as uuidv4 } from 'uuid';

export default function Canvas() {
  const canvasElements = useGameStore((state) => state.canvasElements);
  const removeCanvasElement = useGameStore((state) => state.removeCanvasElement);
  const addCanvasElement = useGameStore((state) => state.addCanvasElement);
  const discoverElement = useGameStore((state) => state.discoverElement);
  const addRecentRecipe = useGameStore((state) => state.addRecentRecipe);

  // Track elements currently in merge animation to prevent double-merges
  const mergingElements = useRef<Set<string>>(new Set());

  // Get element dimensions (approximation based on text length)
  const getElementDimensions = (elementName: string) => {
    // Approximate dimensions based on text length
    const charWidth = 8;
    const padding = 32; // 16px on each side
    const width = elementName.length * charWidth + padding;
    const height = 36; // Fixed height
    return { width, height };
  };

  // Check for collisions between elements
  const checkForCollisions = () => {
    const elements = canvasElements;

    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const el1 = elements[i];
        const el2 = elements[j];

        // Skip if either element is currently merging
        if (mergingElements.current.has(el1.id) || mergingElements.current.has(el2.id)) {
          continue;
        }

        const dim1 = getElementDimensions(el1.name);
        const dim2 = getElementDimensions(el2.name);

        const collision = checkCollision(
          { x: el1.x, y: el1.y, ...dim1 },
          { x: el2.x, y: el2.y, ...dim2 }
        );

        if (collision) {
          handleCollision(el1.id, el1.name, el1.category, el2.id, el2.name, el2.category);
        }
      }
    }
  };

  // Handle collision between two elements
  const handleCollision = (
    id1: string,
    name1: string,
    category1: string,
    id2: string,
    name2: string,
    category2: string
  ) => {
    // Check if recipe exists
    const recipe = getRecipe(name1, name2);

    if (recipe) {
      // Valid merge
      mergingElements.current.add(id1);
      mergingElements.current.add(id2);

      // Calculate midpoint
      const el1 = canvasElements.find((el) => el.id === id1);
      const el2 = canvasElements.find((el) => el.id === id2);

      if (!el1 || !el2) return;

      const midpoint = getMidpoint(
        { x: el1.x, y: el1.y },
        { x: el2.x, y: el2.y }
      );

      // Play merge animation
      playMergeAnimation(id1, id2, midpoint).then(() => {
        // Remove both elements
        removeCanvasElement(id1);
        removeCanvasElement(id2);

        // Create new element at midpoint
        const newElementId = uuidv4();
        addCanvasElement({
          id: newElementId,
          name: recipe.result,
          x: midpoint.x,
          y: midpoint.y,
          category: recipe.category,
        });

        // Discover new element
        discoverElement(recipe.result, recipe.category);

        // Play appear animation
        setTimeout(() => {
          playAppearAnimation(newElementId);
        }, 50);

        // Clean up merging state
        mergingElements.current.delete(id1);
        mergingElements.current.delete(id2);
      });
    } else {
      // Invalid merge - shake both elements
      playShakeAnimation(id1);
      playShakeAnimation(id2);

      // Temporarily mark as merging to prevent repeated shake animations
      mergingElements.current.add(id1);
      mergingElements.current.add(id2);

      setTimeout(() => {
        mergingElements.current.delete(id1);
        mergingElements.current.delete(id2);
      }, 500);
    }
  };

  // Handle drag move for real-time collision detection
  const handleDragMove = () => {
    checkForCollisions();
  };

  return (
    <div
      className="relative w-full"
      style={{
        height: '100%',
        backgroundColor: '#0a0a14',
      }}
      data-canvas
    >
      <NetworkBackground />
      {canvasElements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          onDragMove={handleDragMove}
        />
      ))}
    </div>
  );
}
