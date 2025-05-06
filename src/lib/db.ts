
import Database from 'better-sqlite3';
import { useState, useEffect } from 'react';

let db: Database.Database | null = null;

// Initialize database
export const initDatabase = () => {
  if (!db) {
    try {
      db = new Database(':memory:'); // In-memory database for demo
      console.log('SQLite database initialized in memory');
      
      // Create tracks table
      db.exec(`
        CREATE TABLE IF NOT EXISTS tracks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          artists TEXT NOT NULL,
          certified BOOLEAN DEFAULT FALSE,
          plays INTEGER DEFAULT 0,
          category TEXT DEFAULT 'featured'
        )
      `);
      
      // Insert mock data
      const insert = db.prepare(`
        INSERT INTO tracks (title, artists, certified, plays, category) 
        VALUES (@title, @artists, @certified, @plays, @category)
      `);
      
      const mockTracks = [
        { title: 'Tourne le', artists: 'Doom x RZZY', certified: true, plays: 357, category: 'featured' },
        { title: 'Ready?', artists: 'Tracy x Bob Foxx', certified: true, plays: 174000, category: 'featured' },
        { title: 'dontPretend ❤ urMine', artists: 'danydanidannie x Bob Foxx', certified: true, plays: 92, category: 'featured' },
        { title: 'On and On', artists: 'archie x Kai', certified: true, plays: 3900000, category: 'popular' },
        { title: 'MOON', artists: 'MOON x RZZY', certified: true, plays: 5900000, category: 'popular' },
        { title: 'We do it 💪', artists: 'Tarika x Bob Foxx', certified: true, plays: 149000, category: 'popular' },
        { title: 'Desert', artists: 'Tracy x Bob Foxx', certified: true, plays: 45, category: 'new' },
        { title: 'Electric Dreams', artists: 'NOKTRN x Kai', certified: true, plays: 12500, category: 'new' },
        { title: 'Neon City', artists: 'Bob Foxx x RZZY', certified: true, plays: 8700, category: 'new' },
        { title: 'Digital Soul', artists: 'Tracy x danydanidannie', certified: true, plays: 6300, category: 'new' }
      ];
      
      const transaction = db.transaction(() => {
        for (const track of mockTracks) {
          insert.run(track);
        }
      });
      
      transaction();
      console.log('Mock data inserted');
    } catch (error) {
      console.error('Failed to initialize SQLite database:', error);
    }
  }
};

// Get tracks by category
export const getTracks = (category: string = 'featured') => {
  if (!db) {
    initDatabase();
  }
  
  try {
    const stmt = db?.prepare('SELECT * FROM tracks WHERE category = ? ORDER BY plays DESC');
    return stmt?.all(category) || [];
  } catch (error) {
    console.error(`Failed to get ${category} tracks:`, error);
    return [];
  }
};

// Use this hook to fetch tracks data
export function useTracks(category: string = 'featured') {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize database if needed
    if (!db) {
      initDatabase();
    }
    
    // Fetch tracks
    const fetchedTracks = getTracks(category);
    setTracks(fetchedTracks);
    setLoading(false);
  }, [category]);
  
  return { tracks, loading };
}
