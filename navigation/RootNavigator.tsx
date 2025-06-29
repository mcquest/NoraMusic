import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import { Track } from '../types';

export type RootStackParamList = {
  Search: undefined;
  Details: { track: Track };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
