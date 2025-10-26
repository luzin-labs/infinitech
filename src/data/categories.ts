import { Category } from '@/types/game';

// Category color mappings (from planning.md)
export const categoryColors: Record<string, string> = {
  fundamentals: '#3b82f6',   // Blue - Basic building blocks
  infrastructure: '#ef4444',  // Red - Hardware and networking
  software: '#06b6d4',        // Cyan - Programming and tools
  applications: '#a855f7',    // Purple - User-facing tech
  advanced: '#ec4899',        // Pink - Security, AI, data systems
};

// Tab names and order
export const categoryTabs = [
  'Fundamentals',
  'Infrastructure',
  'Software',
  'Applications',
  'Advanced',
  'All',
] as const;

// Map tab names to internal category names
export const tabToCategoryMap: Record<string, Category | 'all'> = {
  'Fundamentals': 'fundamentals',
  'Infrastructure': 'infrastructure',
  'Software': 'software',
  'Applications': 'applications',
  'Advanced': 'advanced',
  'All': 'all',
};

// Get color for a category
export function getCategoryColor(category: string): string {
  return categoryColors[category] || categoryColors.fundamentals;
}

// Get category from element name (for starting elements)
export function getElementCategory(elementName: string): Category {
  if (elementName === '0' || elementName === '1') {
    return 'fundamentals';
  }
  // For discovered elements, category is stored with the element
  return 'fundamentals'; // Default fallback
}
