import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, CanvasElement } from '@/types/game';

interface GameStore extends GameState {
  // Actions
  addCanvasElement: (element: CanvasElement) => void;
  removeCanvasElement: (id: string) => void;
  updateCanvasElementPosition: (id: string, x: number, y: number) => void;
  discoverElement: (name: string, category: string) => void;
  removeNewBadge: (name: string) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  addRecentRecipe: (element1: string, element2: string, result: string) => void;
  clearCanvas: () => void;
  resetProgress: () => void;
}

const initialState: GameState = {
  discoveredElements: [],
  canvasElements: [],
  showNewBadge: [],
  searchQuery: '',
  categoryFilter: 'All',
  recentRecipes: [],
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      addCanvasElement: (element) =>
        set((state) => ({
          canvasElements: [...state.canvasElements, element],
        })),

      removeCanvasElement: (id) =>
        set((state) => ({
          canvasElements: state.canvasElements.filter((el) => el.id !== id),
        })),

      updateCanvasElementPosition: (id, x, y) =>
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id ? { ...el, x, y } : el
          ),
        })),

      discoverElement: (name, category) =>
        set((state) => {
          // Check if already discovered
          if (state.discoveredElements.includes(name)) {
            return state;
          }
          return {
            discoveredElements: [...state.discoveredElements, name],
            showNewBadge: [...state.showNewBadge, name],
          };
        }),

      removeNewBadge: (name) =>
        set((state) => ({
          showNewBadge: state.showNewBadge.filter((el) => el !== name),
        })),

      setSearchQuery: (query) =>
        set(() => ({
          searchQuery: query,
        })),

      setCategoryFilter: (category) =>
        set(() => ({
          categoryFilter: category,
        })),

      addRecentRecipe: (element1, element2, result) =>
        set((state) => {
          const newRecipe = { element1, element2, result };
          // Check if recipe already exists in recent (by result)
          const exists = state.recentRecipes.some(
            (r) => r.result === result
          );
          if (exists) return state; // Don't add duplicates

          // Add to front, keep max 5
          const updated = [newRecipe, ...state.recentRecipes].slice(0, 5);
          return { recentRecipes: updated };
        }),

      clearCanvas: () =>
        set(() => ({
          canvasElements: [],
        })),

      resetProgress: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: 'infinite-craft-progress',
    }
  )
);
