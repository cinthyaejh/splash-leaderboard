
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import Hero from '@/components/Hero';
import TabNavigation from '@/components/TabNavigation';
import TrackList from '@/components/TrackList';
import BottomNavigation from '@/components/BottomNavigation';
import { useTracks } from '@/lib/db';

const Index = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const { tracks, loading } = useTracks(activeTab);

  return (
    <div className="min-h-screen bg-black pb-16">
      <div className="max-w-md mx-auto bg-kaimix-dark">
        <div className="p-4">
          <Logo />
        </div>
        
        <Hero />
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="overflow-y-auto max-h-[calc(100vh-500px)]">
          <TrackList tracks={tracks} loading={loading} />
        </div>
        
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
