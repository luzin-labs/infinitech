import { Category } from '@/types/game';

// Category color mappings (from planning.md)
export const categoryColors: Record<string, string> = {
  basic: '#3b82f6',      // Blue - Basic/Numbers
  logic: '#a855f7',      // Purple - Logic Gates
  data: '#10b981',       // Green - Data Structures
  operations: '#f59e0b', // Orange - Operations
  hardware: '#ef4444',   // Red - Hardware
  software: '#06b6d4',   // Cyan - Software
  network: '#6366f1',    // Indigo - Network
  advanced: '#ec4899',   // Pink - AI/Advanced
};

// Tab names and order
export const categoryTabs = [
  'Basics',
  'Logic',
  'Data',
  'Operations',
  'Hardware',
  'Software',
  'Network',
  'All',
] as const;

// Map tab names to internal category names
export const tabToCategoryMap: Record<string, Category | 'all'> = {
  'Basics': 'basic',
  'Logic': 'logic',
  'Data': 'data',
  'Operations': 'operations',
  'Hardware': 'hardware',
  'Software': 'software',
  'Network': 'network',
  'All': 'all',
};

// Get color for a category
export function getCategoryColor(category: string): string {
  return categoryColors[category] || categoryColors.basic;
}

// Get category from element name (for starting elements)
export function getElementCategory(elementName: string): Category {
  if (elementName === '0' || elementName === '1') {
    return 'basic';
  }
  // For discovered elements, category is stored with the element
  return 'basic'; // Default fallback
}
