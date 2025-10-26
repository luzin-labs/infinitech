'use client';

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

const categories = ['All', 'Fundamentals', 'Infrastructure', 'Software', 'Applications', 'Advanced'];

export default function SearchFilter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchQuery = useGameStore((state) => state.searchQuery);
  const setSearchQuery = useGameStore((state) => state.setSearchQuery);
  const categoryFilter = useGameStore((state) => state.categoryFilter);
  const setCategoryFilter = useGameStore((state) => state.setCategoryFilter);
  const discoveredElements = useGameStore((state) => state.discoveredElements);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Get category counts (placeholder - will be properly calculated in ElementGrid)
  const getCategoryCount = (category: string) => {
    // For now, just return discovered count for 'All', actual counts handled in ElementGrid
    if (category === 'All') return discoveredElements.length + 2; // +2 for starting elements
    return 0; // Will be properly calculated based on actual elements
  };

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e0e0e0] dark:border-[#3a3a3a]">
      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search elements..."
          className="w-full px-4 py-2 bg-[#f5f5f5] dark:bg-[#252525] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-md text-[14px] text-black dark:text-white placeholder:text-[#999] dark:placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-opacity-20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-black dark:hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2 bg-[#f5f5f5] dark:bg-[#252525] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-md text-[14px] font-medium text-black dark:text-white flex items-center gap-2 hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f] transition-colors whitespace-nowrap"
        >
          {categoryFilter}
          <span className="text-xs">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 min-w-[180px] bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#3a3a3a] rounded-md shadow-lg z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCategoryFilter(category);
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-[14px] text-black dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {categoryFilter === category && <span>✓</span>}
                  {category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
