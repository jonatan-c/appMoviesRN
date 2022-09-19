/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Movie } from '../interfaces/movieInterface';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
}

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
