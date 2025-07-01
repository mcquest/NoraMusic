import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchResults from '../SearchResults';
import { Track } from '../../types';

const mockTracks: Track[] = [
  {
    trackId: 1,
    trackName: 'Test Song',
    artistName: 'Test Artist',
    collectionName: 'Test Album',
    artworkUrl100: 'https://example.com/image.jpg',
    previewUrl: 'https://example.com/preview.mp3',
  },
];

describe('SearchResults', () => {
  it('renders track info and handles selection', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<SearchResults results={mockTracks} onSelect={onSelect} />);

    expect(getByText('Test Song')).toBeTruthy();
    expect(getByText('Test Artist')).toBeTruthy();

    fireEvent.press(getByText('Test Song'));
    expect(onSelect).toHaveBeenCalledWith(mockTracks[0]);
  });
});
