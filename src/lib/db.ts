import { useState, useEffect } from 'react';
import { Track } from './types';

// Define the database name and store
const DB_NAME = 'kaimixDB';
const STORE_NAME = 'tracks';

// Initialize database
export const initDatabase = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    // Handle database upgrade (or creation)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('category', 'category', { unique: false });
        console.log('Tracks store created');
      }
    };
    
    // Handle success
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log('IndexedDB initialized successfully');
      
      // Insert mock data only if the store is empty
      checkAndPopulateData(db).then(() => {
        resolve();
      });
    };
    
    // Handle error
    request.onerror = (event) => {
      console.error('Failed to initialize IndexedDB:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Check if data exists and populate if empty
const checkAndPopulateData = async (db: IDBDatabase): Promise<void> => {
  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const countRequest = store.count();
    
    countRequest.onsuccess = () => {
      const count = countRequest.result;
      
      if (count === 0) {
        // If no data exists, populate with mock data
        const mockTracks = [
          { title: 'Tourne le', artists: 'Doom x RZZY', certified: true, plays: 357, category: 'Challenge', origin: 'FR' },
          { title: 'Ready?', artists: 'Tracy x Bob Foxx', certified: true, plays: 174000, category: 'Challenge', origin: 'US' },
          { title: 'dontPretend ❤ urMine', artists: 'danydanidannie x Bob Foxx', certified: true, plays: 92, category: 'Challenge', origin: 'DE' },
          { title: 'On and On', artists: 'archie x Kai', certified: true, plays: 3900000, category: 'Popular', origin: 'GB' },
          { title: 'MOON', artists: 'MOON x RZZY', certified: true, plays: 5900000, category: 'Popular', origin: 'KR' },
          { title: 'We do it 💪', artists: 'Tarika x Bob Foxx', certified: true, plays: 149000, category: 'Popular', origin: 'IN' },
          { title: 'Desert', artists: 'Tracy x Bob Foxx', certified: true, plays: 45, category: 'Challenge', origin: 'JP' },
          { title: 'Electric Dreams', artists: 'NOKTRN x Kai', certified: true, plays: 12500, category: 'Popular', origin: 'US' },
          { title: 'Neon City', artists: 'Bob Foxx x RZZY', certified: true, plays: 8700, category: 'Challenge', origin: 'US' },
          { title: 'Digital Soul', artists: 'Tracy x danydanidannie', certified: true, plays: 6300, category: 'Challenge', origin: 'US' }
        ];
        
        addTracks(mockTracks).then(() => {
          console.log('Mock data inserted');
          resolve();
        });
      } else {
        console.log('Data already exists, skipping mock data insertion');
        resolve();
      }
    };
  });
};

// Add tracks to the database
const addTracks = async (tracks: Omit<Track, 'id'>[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      let counter = 0;
      
      tracks.forEach(track => {
        const addRequest = store.add(track);
        
        addRequest.onsuccess = () => {
          counter++;
          if (counter === tracks.length) {
            resolve();
          }
        };
        
        addRequest.onerror = (e) => {
          reject((e.target as IDBRequest).error);
        };
      });
      
      transaction.oncomplete = () => {
        console.log('All tracks added successfully');
      };
    };
    
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Get tracks by category
export const getTracks = async (category: string = 'featured'): Promise<Track[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('category');
      const query = index.getAll(category);
      
      query.onsuccess = () => {
        // Sort by plays in descending order
        const result = query.result.sort((a, b) => b.plays - a.plays);
        resolve(result);
      };
      
      query.onerror = (e) => {
        reject((e.target as IDBRequest).error);
      };
    };
    
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Get all tracks
export const getAllTracks = async (): Promise<Track[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const allTracksRequest = store.getAll();
      
      allTracksRequest.onsuccess = () => {
        const result = allTracksRequest.result.sort((a, b) => b.plays - a.plays);
        resolve(result);
      };
      
      allTracksRequest.onerror = (e) => {
        reject((e.target as IDBRequest).error);
      };
    };
    
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Use this hook to fetch tracks data
export function useTracks(tab: string, region: string = 'all') {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      await initDatabase();
      let fetchedTracks: Track[];
      
      if (tab === 'region') {
        fetchedTracks = await getAllTracks();
        if (region !== 'all') {
          fetchedTracks = fetchedTracks.filter(track => track.origin === region);
        }
      } else {
        fetchedTracks = await getTracks(tabToCategory[tab]);
      }
      
      setTracks(fetchedTracks);
      setLoading(false);
    }
    fetchData();
  }, [tab, region]);
  
  return { tracks, loading };
}

const tabToCategory = {
  challenge: 'Challenge',
  popular: 'Popular',
  region: 'all'
};

export const getAllTracksWithOrigin = async (origin: string): Promise<Track[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const allTracksRequest = store.getAll();
      
      allTracksRequest.onsuccess = () => {
        const result = allTracksRequest.result.filter(track => track.origin === origin);
        resolve(result);
      };
      
      allTracksRequest.onerror = (e) => {
        reject((e.target as IDBRequest).error);
      };
    };
    
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};
