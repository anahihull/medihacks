import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const HomeView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      setErrorMsg('Inicio de sesión exitoso!');
      // Navega a la siguiente pantalla o realiza cualquier otra acción
    } else {
      setErrorMsg('Error: Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home View</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,  // Esquinas redondeadas
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,  // Esquinas redondeadas
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Agregado para dar espacio entre el TextInput y el botón
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeView;
