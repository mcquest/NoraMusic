import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export const playTrackPreview = async (url: string) => {
  if (currentSound) {
    await currentSound.unloadAsync();
  }
  const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
  currentSound = sound;
};
