import { Recipe, RecipeBook } from '@/types/game';

// Recipe book with all merge combinations
// Keys are sorted alphabetically (e.g., "0+1" not "1+0")
export const recipes: RecipeBook = {
  // Tier 1 - Basic Concepts
  "0+1": { result: "Bit", category: "data" },
  "1+1": { result: "Two", category: "basic" },
  "0+0": { result: "Zero", category: "basic" },

  // Tier 2 - Numbers & Data
  "Bit+Bit": { result: "Byte", category: "data" },
  "0+Two": { result: "Binary", category: "basic" },
  "1+Two": { result: "Three", category: "basic" },
  "Byte+Byte": { result: "Word", category: "data" },

  // Logic Gates
  "0+Binary": { result: "NOT", category: "logic" },
  "1+Binary": { result: "AND", category: "logic" },
  "0+Three": { result: "OR", category: "logic" },
  "1+Three": { result: "XOR", category: "logic" },
  "AND+NOT": { result: "NAND", category: "logic" },
  "NOR+NOT": { result: "NOR", category: "logic" },

  // Tier 3 - Data Structures
  "Word+Word": { result: "32-bit", category: "data" },
  "32-bit+32-bit": { result: "64-bit", category: "data" },
  "Array+Byte": { result: "Array", category: "data" },
  "Array+Bit": { result: "Memory", category: "hardware" },
  "32-bit+Word": { result: "Register", category: "hardware" },

  // Tier 4 - Operations
  "Three+Two": { result: "Addition", category: "operations" },
  "Two+Zero": { result: "Subtraction", category: "operations" },
  "Addition+Byte": { result: "Adder", category: "operations" },
  "AND+XOR": { result: "Half-Adder", category: "operations" },
  "Half-Adder+Half-Adder": { result: "Full-Adder", category: "operations" },

  // Tier 5 - Arithmetic & Logic
  "Adder+AND": { result: "ALU", category: "hardware" },
  "Full-Adder+OR": { result: "Calculator", category: "hardware" },
  "ALU+XOR": { result: "Processor-Core", category: "hardware" },

  // Tier 6 - Memory & Hardware
  "AND+NOT": { result: "Latch", category: "hardware" },
  "Latch+OR": { result: "Flip-Flop", category: "hardware" },
  "Flip-Flop+Word": { result: "Register-Alt", category: "hardware" },
  "Array+Register": { result: "RAM", category: "hardware" },
  "32-bit+Memory": { result: "Cache", category: "hardware" },

  // Tier 7 - Computing Units
  "ALU+Register": { result: "CPU", category: "hardware" },
  "CPU+RAM": { result: "Computer", category: "hardware" },
  "Memory+Processor-Core": { result: "System", category: "hardware" },
  "Computer+Register": { result: "Mainframe", category: "hardware" },

  // Tier 8 - Programming Concepts
  "Array+Binary": { result: "Code", category: "software" },
  "Code+CPU": { result: "Program", category: "software" },
  "ALU+Program": { result: "Algorithm", category: "software" },
  "Code+Computer": { result: "Software", category: "software" },
  "Byte+Code": { result: "Data", category: "software" },

  // Tier 9 - Advanced Software
  "Algorithm+Data": { result: "Function", category: "software" },
  "Function+Function": { result: "Library", category: "software" },
  "Application+Program": { result: "Application", category: "software" },
  "Mainframe+Mainframe": { result: "Server", category: "network" },
  "Server+Server": { result: "Network", category: "network" },

  // Tier 10 - Modern Computing
  "Computer+Network": { result: "Internet", category: "network" },
  "Internet+Software": { result: "Cloud", category: "network" },
  "Algorithm+Algorithm": { result: "AI", category: "advanced" },
  "AI+Code": { result: "Machine-Learning", category: "advanced" },
  "Application+Cloud": { result: "SaaS", category: "advanced" },
  "AI+Computer": { result: "AGI", category: "advanced" },
};

// Helper function to get recipe result
// Sorts inputs alphabetically to match key format
export function getRecipe(element1: string, element2: string): Recipe | null {
  const key = [element1, element2].sort().join('+');
  return recipes[key] || null;
}

// Get total count of discoverable elements
export function getTotalDiscoverableCount(): number {
  const uniqueResults = new Set<string>();
  Object.values(recipes).forEach(recipe => {
    uniqueResults.add(recipe.result);
  });
  return uniqueResults.size;
}
