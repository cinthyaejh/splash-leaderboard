import React, { useState } from 'react';
import Logo from '@/components/Logo';
import Hero from '@/components/Hero';
import TabNavigation from '@/components/TabNavigation';
import TrackList from '@/components/TrackList';
import BottomNavigation from '@/components/BottomNavigation';
import RegionFilter from '@/components/RegionFilter';
import { useTracks, getAllTracks } from '@/lib/db';

const Index = () => {
  const [activeTab, setActiveTab] = useState('challenge');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const { tracks, loading } = useTracks(activeTab, selectedRegion);

  return (
    <div className="min-h-screen bg-black pb-16">
      <div className="max-w-md mx-auto bg-kaimix-dark">
        <div className="p-4">
          <Logo />
        </div>
        
        <Hero imageUrl="images/donutDayKai.png" artistName="Kai" />
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'region' && (
          <RegionFilter 
            selectedRegion={selectedRegion} 
            onRegionChange={setSelectedRegion} 
          />
        )}
        
        <div className="overflow-y-auto max-h-[calc(100vh-500px)]">
          <TrackList tracks={tracks} loading={loading} />
        </div>
        
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
