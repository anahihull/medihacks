import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
       <Icon name="home" size={30} color="white" /> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Memories')}
      >
      <Icon name="camera" size={30} color="white" /> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('GpsView')}
      >
      <Icon name="map" size={30} color="white" /> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('MyCircle')}
      >
      <Icon name="people" size={30} color="white" /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#590D8C',
    height: 60, 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BottomNavBar;