import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal} from 'react-native';
import TimelineForPersons from '../components/TimelineForPersons';
import UploadPerson from '../components/UploadPerson';
import {Button, PaperProvider} from 'react-native-paper';

const MyCircle = () => {
  const [memories, setMemories] = useState([
    {
      id: 1,
      content: 'Mila and Mia',
      start: 'Sibling',
      image: 'https://i.pinimg.com/564x/85/07/92/850792e9b3e1f6d68c9b0d732e6116ed.jpg',
    },
    {
      id: 2,
      content: 'Lorenzo Grandson',
      start: 'Sibling',
      image: 'https://www.olimpiadadeinformatica.org.mx/Resultados/img/user/5410.jpeg',
    },
    {
      id: 3,
      content: 'Adolfo Grandson',
      start: 'Sibling',
      image: 'https://media.licdn.com/dms/image/C5603AQEm8NPCmb9GZA/profile-displayphoto-shrink_800_800/0/1621297401371?e=1700092800&v=beta&t=90qYnDv4oMkUbVx4sY1UXNb3EeP-dNfaH6wa-Tud2Uw',
    },

  
  ]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

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

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri); // Al hacer clic en la imagen, guarda la URI de la imagen seleccionada
    setModalVisible(true); // Abre el modal para mostrar la imagen en su tamaño completo
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {memories.map((memory) => (
          <TouchableOpacity
            style={styles.memoryContainer}
            key={memory.id}
            onPress={() => handleImageClick(memory.image)} // Llama a la función para mostrar la imagen en clic
          >
            {memory.image && (
              <Image
                source={{ uri: memory.image }}
                style={styles.memoryImage}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.memoryText}>{memory.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <UploadPerson memories={memories} onNewMemory={handleNewMemory} />
      </View>

      {/* Modal para mostrar la imagen en tamaño completo */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)} // Cierra el modal al hacer clic en el botón de cierre
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
            />
          )}
        </View>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#D8BAD9',
    height: 700
  },
  memoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  memoryImage: {
    width: 100,
    height: 100,
    marginRight: 50,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  memoryText: {
    // Estilos de texto
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: '75%', // Puedes ajustar el tamaño de la imagen según tus preferencias
    height: '75%', // Puedes ajustar el tamaño de la imagen según tus preferencias
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MyCircle;