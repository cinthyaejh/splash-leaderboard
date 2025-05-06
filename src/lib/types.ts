export interface Track {
  id: number;
  title: string;
  artists: string;
  certified: boolean;
  plays: number;
  category: string;
  origin: string; // Country code, e.g., 'US', 'FR'
}

export function formatNumber(number: number): string {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'K';
  } else {
    return number.toString();
  }
}
