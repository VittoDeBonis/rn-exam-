import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './src/screens/ExploreTab';
import FavoriteTabScreen from './src/screens/FavoriteTab';
import { FavoritesProvider } from './src/context/FavoriteContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Favorites" component={FavoriteTabScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}