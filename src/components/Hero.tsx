
import React from 'react';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] overflow-hidden mb-2">
      <img 
        src="/lovable-uploads/6b7a6418-2a62-48fd-a27f-0be4ed0792b1.png" 
        alt="Artist NOKTRN" 
        className="w-full h-full object-cover object-center" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex flex-col">
          <div className="text-lg text-white mb-1">Mix with <span className="bg-blue-700 text-white px-2 py-0.5 text-xs font-bold inline-block ml-1">NEW ARTIST</span></div>
          <h1 className="text-6xl font-bold text-white tracking-wider">NOKTRN</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
