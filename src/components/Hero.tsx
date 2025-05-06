import React from 'react';

interface HeroProps {
  imageUrl: string;
  artistName: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl, artistName }) => {
  return (
    <div className="relative w-full h-[300px] overflow-hidden mb-2">
      <img 
        src={imageUrl}
        alt={`Artist ${artistName}`}
        className="w-full h-full object-contain object-center bg-black"
      />
    </div>
  );
};

export default Hero;
