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

  // Distribute items into balanced columns (max 4 rows per column)
  const distributeItemsIntoColumns = (items: string[], maxRows = 4) => {
    const totalItems = items.length;
    const numColumns = Math.ceil(totalItems / maxRows);
    const baseItemsPerColumn = Math.floor(totalItems / numColumns);
    const extraItems = totalItems % numColumns;

    const columns: string[][] = [];
    let itemIndex = 0;

    for (let col = 0; col < numColumns; col++) {
      const itemsInThisColumn = (col < extraItems)
        ? baseItemsPerColumn + 1
        : baseItemsPerColumn;

      const columnItems = items.slice(itemIndex, itemIndex + itemsInThisColumn);
      columns.push(columnItems);
      itemIndex += itemsInThisColumn;
    }

    return columns;
  };

  const columns = distributeItemsIntoColumns(filteredElements, 4);

  return (
    <div
      className="overflow-x-auto overflow-y-hidden px-4"
      style={{
        height: 'calc(30vh - 48px)'
      }}
    >
      <div
        className="h-full"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          paddingBottom: '16px'
        }}
      >
        {columns.map((columnItems, colIndex) => (
          <div
            key={colIndex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {columnItems.map((elementName) => {
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
        ))}
      </div>
    </div>
  );
}
