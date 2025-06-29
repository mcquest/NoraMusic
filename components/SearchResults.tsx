import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Track } from '../types';

interface Props {
  results: Track[];
  onSelect: (track: Track) => void;
}

const SearchResults: React.FC<Props> = ({ results, onSelect }) => {
  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <Image source={{ uri: item.artworkUrl100 }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.trackName}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.artistName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.trackId.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: '600',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default SearchResults;
