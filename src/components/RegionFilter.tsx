import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Helper to convert country code to flag emoji
function countryCodeToEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

// List of available countries from our mock data
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' }
];

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className="px-4 py-2">
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-full bg-kaimix-dark border-gray-800 text-white">
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent className="bg-kaimix-dark border-gray-800">
          <SelectItem value="all" className="text-white hover:bg-gray-800">
            All Regions
          </SelectItem>
          {countries.map((country) => (
            <SelectItem 
              key={country.code} 
              value={country.code}
              className="text-white hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <span>{countryCodeToEmoji(country.code)}</span>
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegionFilter; 