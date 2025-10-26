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
  'Basics',
  'Logic',
  'Data',
  'Operations',
  'Hardware',
  'Software',
  'Network',
  'Web',
  'Mobile',
  'Database',
  'Security',
  'DevOps',
  'Languages',
  'Tools',
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
  'Web': 'web',
  'Mobile': 'mobile',
  'Database': 'database',
  'Security': 'security',
  'DevOps': 'devops',
  'Languages': 'language',
  'Tools': 'tools',
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
