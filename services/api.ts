import axios from 'axios';
import { Track } from '../types';

export const fetchMusic = async (query: string): Promise<Track[]> => {
  try {
    const res = await axios.get(`https://itunes.apple.com/search?media=music&term=${encodeURIComponent(query)}`);
    return res.data.results;
  } catch (error) {
    console.error('API fetch failed:', error);
    return [];
  }
};
