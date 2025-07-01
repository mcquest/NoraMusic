import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { Text, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavorites } from '../useFavorites';

// Mock AsyncStorage with async behavior
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
}));

// Mock track object
const mockTrack = {
  trackId: 1,
  trackName: 'Test Song',
  artistName: 'Test Artist',
  collectionName: 'Test Album',
  artworkUrl100: '',
  previewUrl: '',
};

// Test component that uses the hook
const TestComponent: React.FC = () => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const liked = isFavorite(mockTrack.trackId);

  return (
    <View>
      <Text testID="status">{liked ? 'Liked' : 'Not Liked'}</Text>
      <Button title="Add" onPress={() => addFavorite(mockTrack)} />
      <Button title="Remove" onPress={() => removeFavorite(mockTrack.trackId)} />
    </View>
  );
};

describe('useFavorites', () => {
  it('adds and removes a favorite', async () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    // Initial state
    expect(getByTestId('status').props.children).toBe('Not Liked');

    // Add to favorites
    await act(async () => {
      fireEvent.press(getByText('Add'));
    });

    expect(getByTestId('status').props.children).toBe('Liked');
    expect(AsyncStorage.setItem).toHaveBeenCalled();

    // Remove from favorites
    await act(async () => {
      fireEvent.press(getByText('Remove'));
    });

    expect(getByTestId('status').props.children).toBe('Not Liked');
  });
});
