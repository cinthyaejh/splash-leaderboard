
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2 flex">
        <div className="h-6 w-6 bg-kaimix-lime rotate-45 mr-1"></div>
        <div className="h-6 w-6 bg-yellow-300 rotate-45"></div>
      </div>
      <span className="text-white text-2xl font-bold">Kaimix</span>
      <span className="text-gray-400 text-xs bg-gray-700 px-2 py-0.5 ml-2 rounded">BETA</span>
    </div>
  );
};

export default Logo;
