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
  setActiveTab: (tab: string) => void;
  clearCanvas: () => void;
  resetProgress: () => void;
}

const initialState: GameState = {
  discoveredElements: [],
  canvasElements: [],
  activeTab: 'Basics',
  showNewBadge: [],
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

      setActiveTab: (tab) =>
        set(() => ({
          activeTab: tab,
        })),

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
