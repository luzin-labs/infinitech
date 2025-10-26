'use client';

import { useGameStore } from '@/store/gameStore';
import PaletteElement from './PaletteElement';
import { tabToCategoryMap } from '@/data/categories';
import { recipes } from '@/data/recipes';

// Helper to get category for a discovered element
function getElementCategory(elementName: string): string {
  // Check if it's a starting element
  if (elementName === '0' || elementName === '1') {
    return 'fundamentals';
  }

  // Find the element in recipes
  for (const recipe of Object.values(recipes)) {
    if (recipe.result === elementName) {
      return recipe.category;
    }
  }

  return 'fundamentals'; // Fallback
}

export default function ElementGrid() {
  const activeTab = useGameStore((state) => state.activeTab);
  const discoveredElements = useGameStore((state) => state.discoveredElements);
  const showNewBadge = useGameStore((state) => state.showNewBadge);

  // Always include starting elements (0 and 1)
  const startingElements = ['0', '1'];

  // Combine starting elements with discovered elements
  const allElements = [
    ...startingElements,
    ...discoveredElements.filter((el) => !startingElements.includes(el)),
  ];

  // Filter elements based on active tab
  const categoryKey = tabToCategoryMap[activeTab];
  const filteredElements =
    categoryKey === 'all'
      ? allElements
      : allElements.filter((elementName) => {
          const category = getElementCategory(elementName);
          return category === categoryKey;
        });

  if (filteredElements.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500">
        <p className="text-sm">Discover elements by merging!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-4">
      {filteredElements.map((elementName) => {
        const category = getElementCategory(elementName);
        const isNew = showNewBadge.includes(elementName);

        return (
          <PaletteElement
            key={elementName}
            name={elementName}
            category={category}
            isNew={isNew}
          />
        );
      })}
    </div>
  );
}
