import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Nuevo estado para indicar éxito
  const navigation = useNavigation(); 

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      setErrorMsg('Successful Log In!');
      setIsSuccess(true); // Marca como éxito
      // Navega a la siguiente pantalla o realiza cualquier otra acción
      navigation.navigate('MyCircle')
    } else {
      setErrorMsg('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Proceed
      </Button>
      {isSuccess ? (
        <Animatable.Text
          animation="bounceIn" // Puedes elegir la animación que prefieras
          style={styles.successText}
        >
          Success!
        </Animatable.Text>
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000000',
  },
  successText: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LogIn;
