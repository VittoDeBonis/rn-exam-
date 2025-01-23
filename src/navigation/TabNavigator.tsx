import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreTabScreen from "../screens/ExploreTab";
import FavoriteTabScreen from "../screens/FavoriteTab";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="FirstTab" 
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen 
        name="FirstTab" 
        component={ExploreTabScreen}
        options={{
          title: "Explore",
        }}
      />
      <Tab.Screen 
        name="SecondTab" 
        component={FavoriteTabScreen}
        options={{
          title: "Favorites",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;