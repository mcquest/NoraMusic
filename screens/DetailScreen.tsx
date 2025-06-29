import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

type DetailRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailRouteProp;
}

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { track } = route.params;
  const soundRef = useRef<Audio.Sound | null>(null);

  const playPreview = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: track.previewUrl },
      { shouldPlay: true }
    );
    soundRef.current = sound;
  };

  // Cleanup when screen unmounts
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
      <Text>{track.collectionName}</Text>
      <Button title="▶️ Play Preview" onPress={playPreview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  artist: { fontSize: 16, color: '#666', marginBottom: 10 },
});

export default DetailScreen;
