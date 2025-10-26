'use client';

import TabNavigation from './TabNavigation';
import ElementGrid from './ElementGrid';

export default function Palette() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-neutral-200 dark:bg-neutral-950 border-t-2 border-neutral-300 dark:border-neutral-800"
      style={{ height: '30vh' }}
    >
      <div className="h-full flex flex-col">
        <TabNavigation />
        <div className="flex-1 overflow-auto py-4">
          <ElementGrid />
        </div>
      </div>
    </div>
  );
}
