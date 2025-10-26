'use client';

import TabNavigation from './TabNavigation';
import ElementGrid from './ElementGrid';

export default function Palette() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a1a] border-t border-[#e0e0e0] dark:border-[#3a3a3a]"
      style={{ height: '30vh', zIndex: 1001 }}
    >
      <div className="h-full flex flex-col">
        <TabNavigation />
        <div className="flex-1 overflow-hidden">
          <ElementGrid />
        </div>
      </div>
    </div>
  );
}
