// services/api.ts
import axios from 'axios';
import { Track } from '../types';

interface FetchResult {
  data?: Track[];
  error?: string;
}

export const fetchMusic = async (query: string): Promise<FetchResult> => {
  try {
    const res = await axios.get(`https://itunes.apple.com/search?media=music&term=${encodeURIComponent(query)}`);
    return { data: res.data.results };
  } catch (error: any) {
    console.error('API fetch failed:', error);
    return { error: error.message || 'Unknown error occurred' };
  }
};
