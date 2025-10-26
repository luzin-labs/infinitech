// TypeScript types and interfaces for Infinite Craft game

export interface CanvasElement {
  id: string;                          // Unique identifier (UUID)
  name: string;                        // Element name (e.g., "Bit", "CPU")
  x: number;                           // X position on canvas (pixels)
  y: number;                           // Y position on canvas (pixels)
  category: string;                    // For color coding (basic/logic/data/etc)
}

export interface RecentRecipe {
  element1: string;
  element2: string;
  result: string;
}

export interface GameState {
  discoveredElements: string[];        // Array of element names user has discovered
  canvasElements: CanvasElement[];     // Elements currently on canvas
  showNewBadge: string[];              // Elements with "New!" badge
  searchQuery: string;                 // Search filter text
  categoryFilter: string;              // Selected category filter ('All', 'Fundamentals', etc.)
  recentRecipes: RecentRecipe[];       // Last 5 discovered recipes
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
