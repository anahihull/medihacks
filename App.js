import React from 'react';
import { View, StyleSheet, } from 'react-native';
import HomeView from './src/views/HomeView';
import MemoriesView from './src/views/MemoriesView';
import GpsView from './src/views/GpsView';
import MyCircle from './src/views/MyCircle';
import * as Font from 'expo-font';
import {useState} from 'react';
import LogIn from './src/views/LogIn';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavBar from './src/components/BottomNavBar'; // Importa el componente personalizado

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavBar {...props} />}>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Memories" component={MemoriesView} />
      <Tab.Screen name="GpsView" component={GpsView} />
      <Tab.Screen name="MyCircle" component={MyCircle} />
    </Tab.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

