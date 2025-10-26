'use client';

import { useGameStore } from '@/store/gameStore';
import { getElementIcon } from '@/data/elementIcons';

export default function RecipeHints() {
  const recentRecipes = useGameStore((state) => state.recentRecipes);

  if (recentRecipes.length === 0) {
    return (
      <div className="absolute top-5 right-5 w-[280px] bg-white dark:bg-[#1a1a1a] bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-lg p-4 shadow-lg z-10 hidden md:block">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-[#666] dark:text-[#999] mb-3">
          💡 Recent Discoveries
        </div>
        <div className="text-[12px] text-[#999] dark:text-[#666] italic">
          Start combining elements!
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-5 right-5 w-[280px] bg-white dark:bg-[#1a1a1a] bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-lg p-4 shadow-lg z-10 hidden md:block">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-[#666] dark:text-[#999] mb-3">
        💡 Recent Discoveries
      </div>
      <div className="space-y-2">
        {recentRecipes.map((recipe, index) => {
          const icon1 = getElementIcon(recipe.element1);
          const icon2 = getElementIcon(recipe.element2);
          const iconResult = getElementIcon(recipe.result);

          return (
            <div
              key={`${recipe.result}-${index}`}
              className="py-2 border-l-2 border-[#e0e0e0] dark:border-[#3a3a3a] pl-3"
            >
              <div className="text-[12px] text-black dark:text-white font-medium">
                {icon1 && <span>{icon1} </span>}
                <span>{recipe.element1}</span>
                <span className="text-[#999] mx-1">+</span>
                {icon2 && <span>{icon2} </span>}
                <span>{recipe.element2}</span>
                <span className="text-[#999] mx-1">→</span>
                {iconResult && <span>{iconResult} </span>}
                <span>{recipe.result}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
