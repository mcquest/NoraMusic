import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import SearchResults from '../components/SearchResults';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet. ❤️</Text>
      ) : (
        <SearchResults
          results={favorites}
          onSelect={(track) => navigation.navigate('Details', { track })}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});

export default FavoritesScreen;