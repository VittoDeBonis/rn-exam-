import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreTabScreen from "../screens/ExploreTab"; 
import FavoriteTabScreen from "../screens/FavoriteTab";
import { TabParamList } from "./types"; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ExploreTab" component={ExploreTabScreen} /> 
      <Tab.Screen name="FavoriteTab" component={FavoriteTabScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;