// types/index.ts

export interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
}

/**
 * Generic API response shape used across the app.
 */
export interface ApiResult<T> {
  data?: T;
  error?: string;
}
