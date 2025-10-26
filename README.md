# InfiniTech

A creative tech element crafting game where you combine basic binary elements (0 and 1) to discover over 300+ technology concepts, from fundamental bits to advanced AI and quantum computing.

## About

InfiniTech is an interactive crafting experience built with modern web technologies. Drag and drop tech elements on the canvas to combine them and unlock new discoveries across the entire technology stack.

## Features

- **300+ Tech Elements**: Discover elements spanning web development, mobile, databases, security, DevOps, blockchain, gaming, IoT, and emerging technologies
- **Intuitive Drag & Drop**: Smooth touch and mouse interactions on all devices using Pointer Events API
- **Dynamic Discovery**: Multiple paths to discover elements create endless experimentation
- **Organized Categories**: Browse elements by Basics, Logic, Data, Operations, Hardware, Software, Network, Web, Mobile, Database, Security, DevOps, Languages, and Tools
- **Tech-Themed Canvas**: Animated network node background for an immersive tech aesthetic
- **Progress Tracking**: Track your discoveries and see how many elements remain to be found
- **Dark Mode**: Modern dark interface perfect for tech enthusiasts

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Zustand** - Lightweight state management
- **next-themes** - Theme switching support

## Getting Started

### Prerequisites

- Node.js 20.18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and navigate to the repository**:
   ```bash
   git clone <repository-url>
   cd infinitech
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## How to Play

1. Start with the basic elements **0** and **1** in your palette
2. Drag elements from the palette onto the canvas
3. Drag one element onto another to combine them
4. Discover new tech elements and expand your collection
5. Experiment with different combinations to unlock the entire tech tree

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── data/            # Game data (recipes, categories)
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
```

## License

MIT License
