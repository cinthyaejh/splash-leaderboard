import React, { useState } from 'react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'challenge', label: 'CHALLENGE' },
    { id: 'popular', label: 'POPULAR' }
  ];

  return (
    <div className="border-b border-gray-800">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 font-medium text-sm relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
