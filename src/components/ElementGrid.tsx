'use client';

import { useGameStore } from '@/store/gameStore';
import PaletteElement from './PaletteElement';
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
  const searchQuery = useGameStore((state) => state.searchQuery);
  const categoryFilter = useGameStore((state) => state.categoryFilter);
  const discoveredElements = useGameStore((state) => state.discoveredElements);
  const showNewBadge = useGameStore((state) => state.showNewBadge);

  // Always include starting elements (0 and 1)
  const startingElements = ['0', '1'];

  // Combine starting elements with discovered elements
  const allElements = [
    ...startingElements,
    ...discoveredElements.filter((el) => !startingElements.includes(el)),
  ];

  // Filter elements based on category filter
  let filteredElements = allElements;

  // Apply category filter
  if (categoryFilter !== 'All') {
    filteredElements = filteredElements.filter((elementName) => {
      const category = getElementCategory(elementName);
      return category.toLowerCase() === categoryFilter.toLowerCase();
    });
  }

  // Apply search query
  if (searchQuery !== '') {
    filteredElements = filteredElements.filter((elementName) =>
      elementName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Empty state with contextual messaging
  if (filteredElements.length === 0) {
    let emptyMessage = 'Discover elements by merging!';
    if (searchQuery && categoryFilter !== 'All') {
      emptyMessage = 'No elements found';
    } else if (searchQuery) {
      emptyMessage = 'No elements match your search';
    } else if (categoryFilter !== 'All') {
      emptyMessage = 'No elements in this category yet';
    }

    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-[14px] text-[#999] dark:text-[#666] py-8">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto hide-scrollbar scroll-smooth h-[calc(30vh-64px)] p-6"
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
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
    </div>
  );
}
