import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const BottomNavBar = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Home')}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Memories')}
      >
        <Text>Memories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('GpsView')}
      >
        <Text>GPS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('MyCircle')}
      >
        <Text>My Circle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Color de fondo de la barra de navegación
    height: 60, // Altura de la barra de navegación
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BottomNavBar;