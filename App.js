import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeView from './src/views/HomeView';
import MemoriesView from './src/views/MemoriesView';
import GpsView from './src/views/GpsView';
import MyCircle from './src/views/MyCircle';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavBar from './src/components/BottomNavBar'; // Importa el componente personalizado

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <BottomNavBar {...props} />} // Agrega la barra de navegación personalizada
      >
        <Tab.Screen name="Home" component={HomeView} />
        <Tab.Screen name="Memories" component={MemoriesView} />
        <Tab.Screen name="GpsView" component={GpsView} />
        <Tab.Screen name="MyCircle" component={MyCircle} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

