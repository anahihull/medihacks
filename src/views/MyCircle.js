import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import TimelineForPersons from '../components/TimelineForPersons';
import UploadPerson from '../components/UploadPerson';

const MyCircle = () => {
  const [memories, setMemories] = useState([]);

  const handleNewMemory = (newMemory) => {
    setMemories((prevMemories) => [
      ...prevMemories,
      {
        id: prevMemories.length + 1,
        content: newMemory.content,
        start: newMemory.start,
        image: newMemory.image,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {memories.map((memory) => (
        <TouchableOpacity
          style={styles.memoryContainer}
          key={memory.id}
        >
          {memory.image && (
            <Image
              source={{ uri: memory.image }}
              style={styles.memoryImage}
            /> // Muestra la imagen si está presente
          )}
          <View style={styles.textContainer}>
            <Text style={styles.memoryText}>{memory.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <UploadPerson memories={memories} onNewMemory={handleNewMemory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
  },
  memoryContainer: {
    flexDirection: 'row', // Alinea elementos en fila
    alignItems: 'center', // Alinea elementos en el centro verticalmente
    marginBottom: 25, // Espacio entre las memorias
  },
  memoryImage: {
    width: 100,
    height: 100,
    marginRight: 50,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1, // Permite que el texto ocupe el espacio disponible
  },
  memoryText: {
    // Estilos de texto
  },
});

export default MyCircle;
