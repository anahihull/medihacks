import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const GpsView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let coordx ;
  let coordy ;
  if (errorMsg) {
    let text = errorMsg;
    coordx = null;
    coordy = null;
  } else if (location) {
    coordx = location.coords.latitude;
    coordy = location.coords.longitude;
  }else{
    coordx = null;
    coordy = null;
  }
  console.log(coordx);

  if(coordx!== null && coordy !== null && coordx!=="undefined" ){
    console.log("renderiando");
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordx,
            longitude: coordy,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude: coordx, longitude: coordy }}
            title="Mi Marcador"
            description="Este es mi marcador"
          />
        </MapView>
        <Button 
        title = "I FEEL LOST"
        ></Button>
      </View>
    );
  }else{
    console.log("eesperando");
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default GpsView;