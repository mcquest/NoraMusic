import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import SearchResults from '../components/SearchResults';
import { fetchMusic } from '../services/api';
import { Track } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = async () => {
    const tracks = await fetchMusic(query);
    setResults(tracks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search songs or artists"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <SearchResults results={results} onSelect={(track) => navigation.navigate('Details', { track })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});

export default SearchScreen;