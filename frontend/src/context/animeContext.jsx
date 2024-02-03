import React, { useEffect, createContext, useContext, useState } from 'react';

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  const setAnimeId = (animeId) => {
    setSelectedAnimeId(animeId);
  };

  useEffect(() => {
    return () => setSelectedAnimeId(null);
  }, []);

  return (
    <AnimeContext.Provider value={{ selectedAnimeId, setAnimeId }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnimeContext must be used within an AnimeProvider');
  }
  return context;
};
