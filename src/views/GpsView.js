import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { Portal, Dialog, Paragraph, Button, PaperProvider, DefaultTheme, ActivityIndicator } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#663399',
    accent: '#f39c12',
  },
};

const MyDialog = ({ visible, message, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const GpsView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showDialog = (message) => {
    setMessage(message);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

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

  if (coordx !== null && coordy !== null && coordx !== "undefined") {
    console.log("renderizando");
    return (
      <PaperProvider theme={theme} style={styles.container}>
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
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="alert"
            onPress={() => showDialog('Sending location to primary contacts.')}
            style={styles.helpButton}
          >
            I NEED HELP
          </Button>
          <MyDialog visible={dialogVisible} message={message} hideDialog={hideDialog} />
        </View>
      </PaperProvider>
    );
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.primary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16, // Ajusta esto para la posición vertical deseada
    alignSelf: 'center', // Centra horizontalmente el botón
  },
  helpButton: {
    width: 150,
    backgroundColor: "#590D8C"
  },
});

export default GpsView;