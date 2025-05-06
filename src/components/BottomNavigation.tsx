
import React from 'react';
import { Flame, User, Plus } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black border-t border-gray-800 h-16 px-4 flex items-center justify-between">
      <button className="flex flex-col items-center text-gray-400 w-12">
        <Flame size={24} />
      </button>
      
      <button className="bg-gradient-to-br from-kaimix-lime to-yellow-300 w-14 h-14 rounded-full flex items-center justify-center -mt-5 shadow-lg shadow-kaimix-lime/20 mx-8">
        <Plus size={24} className="text-black" />
      </button>
      
      <button className="flex flex-col items-center text-gray-400 w-12">
        <User size={24} />
      </button>
    </div>
  );
};

export default BottomNavigation;
