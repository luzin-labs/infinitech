'use client';

import { useGameStore } from '@/store/gameStore';
import { categoryTabs, tabToCategoryMap } from '@/data/categories';
import { recipes } from '@/data/recipes';

// Helper to get category for a discovered element
function getElementCategory(elementName: string): string {
  if (elementName === '0' || elementName === '1') {
    return 'basic';
  }

  for (const recipe of Object.values(recipes)) {
    if (recipe.result === elementName) {
      return recipe.category;
    }
  }

  return 'basic';
}

export default function TabNavigation() {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const discoveredElements = useGameStore((state) => state.discoveredElements);

  // Count elements in each category
  const getCategoryCount = (tabName: string) => {
    const categoryKey = tabToCategoryMap[tabName];

    if (categoryKey === 'all') {
      // Include starting elements (0, 1) plus discovered
      return 2 + discoveredElements.length;
    }

    // Count starting elements
    let count = 0;
    if (categoryKey === 'basic') {
      count = 2; // 0 and 1
    }

    // Count discovered elements in this category
    const discoveredInCategory = discoveredElements.filter((elementName) => {
      const category = getElementCategory(elementName);
      return category === categoryKey;
    });

    return count + discoveredInCategory.length;
  };

  return (
    <div className="flex gap-2 border-b border-neutral-300 dark:border-neutral-700 px-4 overflow-x-auto">
      {categoryTabs.map((tab) => {
        const isActive = activeTab === tab;
        const count = getCategoryCount(tab);

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors
              ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }
            `}
          >
            {tab} ({count})
          </button>
        );
      })}
    </div>
  );
}
