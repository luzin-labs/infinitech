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
  web: '#14b8a6',        // Teal - Web technologies
  mobile: '#8b5cf6',     // Violet - Mobile development
  database: '#22c55e',   // Bright green - Databases
  security: '#dc2626',   // Bright red - Security
  devops: '#fb923c',     // Light orange - DevOps
  protocol: '#4f46e5',   // Deep indigo - Protocols
  language: '#0ea5e9',   // Sky blue - Programming languages
  frontend: '#06b6d4',   // Cyan - Frontend
  backend: '#0891b2',    // Dark cyan - Backend
  blockchain: '#fbbf24', // Amber - Blockchain
  gaming: '#a78bfa',     // Light purple - Gaming
  media: '#f472b6',      // Pink - Media
  ui: '#ec4899',         // Bright pink - UI/UX
  tools: '#64748b',      // Slate - Development tools
  iot: '#10b981',        // Emerald - IoT
  emerging: '#c026d3',   // Fuchsia - Emerging tech
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
