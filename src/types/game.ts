// TypeScript types and interfaces for Infinite Craft game

export interface CanvasElement {
  id: string;                          // Unique identifier (UUID)
  name: string;                        // Element name (e.g., "Bit", "CPU")
  x: number;                           // X position on canvas (pixels)
  y: number;                           // Y position on canvas (pixels)
  category: string;                    // For color coding (basic/logic/data/etc)
}

export interface GameState {
  discoveredElements: string[];        // Array of element names user has discovered
  canvasElements: CanvasElement[];     // Elements currently on canvas
  activeTab: string;                   // Currently selected palette tab
  showNewBadge: string[];              // Elements with "New!" badge
}

export type Category =
  | 'fundamentals'
  | 'infrastructure'
  | 'software'
  | 'applications'
  | 'advanced';

export interface Recipe {
  result: string;
  category: Category;
}

export type RecipeBook = Record<string, Recipe>;
