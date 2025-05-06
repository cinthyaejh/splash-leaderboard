import React from 'react';
import { Play } from 'lucide-react';
import { Track, formatNumber } from '@/lib/types';

// Helper to convert country code to flag emoji
function countryCodeToEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

interface TrackItemProps {
  track: Track;
  onPlay?: (track: Track) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onPlay }) => {
  return (
    <div className="flex justify-between items-center px-4 py-5 border-b border-gray-800">
      <div className="flex flex-col">
        <div className="text-white font-semibold text-lg">{track.title}</div>
        <div className="text-gray-400 text-sm flex items-center gap-2">
          {track.artists}
          {track.certified && (
            <span className="ml-1 text-kaimix-lime text-lg">✦</span>
          )}
          <span>{countryCodeToEmoji(track.origin)}</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-gray-400 mr-3">{formatNumber(track.plays)}</span>
        <button 
          className="w-10 h-10 flex items-center justify-center text-white"
          onClick={() => onPlay?.(track)}
        >
          <Play size={24} fill="white" />
        </button>
      </div>
    </div>
  );
};

interface TrackListProps {
  tracks: Track[];
  loading: boolean;
  onPlay?: (track: Track) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, loading, onPlay }) => {
  if (loading) {
    return <div className="p-4 text-center text-gray-400">Loading tracks...</div>;
  }

  if (tracks.length === 0) {
    return <div className="p-4 text-center text-gray-400">No tracks found</div>;
  }

  return (
    <div className="flex flex-col">
      {tracks.map((track) => (
        <TrackItem 
          key={track.id} 
          track={track} 
          onPlay={onPlay}
        />
      ))}
    </div>
  );
};

export default TrackList;
