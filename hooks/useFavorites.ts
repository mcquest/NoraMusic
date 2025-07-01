import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Track } from '../types';

const FAVORITES_KEY = 'FAVORITE_TRACKS';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Track[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (json) setFavorites(JSON.parse(json));
  };

  const saveFavorites = async (tracks: Track[]) => {
    setFavorites(tracks);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(tracks));
  };

  const addFavorite = async (track: Track) => {
    const updated = [...favorites, track];
    await saveFavorites(updated);
  };

  const removeFavorite = async (trackId: number) => {
    const updated = favorites.filter((t) => t.trackId !== trackId);
    await saveFavorites(updated);
  };

  const isFavorite = (trackId: number): boolean => {
    return favorites.some((t) => t.trackId === trackId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
