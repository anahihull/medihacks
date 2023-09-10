import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text } from 'react-native-paper';

const UploadMemory = ({ memories, onNewMemory }) => {
  const isContentNameUnique = (name) => {
    return !memories.some((memory) => memory.content === name);
  };

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled) {
      return;
    }

    const content = await new Promise((resolve) => {
      Alert.prompt(
        'New Person Name',
        'Enter the name of your loved one:',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (content) => resolve(content),
          },
        ],
        'plain-text'
      );
    });

    if (content) {
      const newMemory = {
        content,
        image: result.assets[0].uri,
      };

      if (isContentNameUnique(content)) {
        onNewMemory(newMemory);
      } else {
        Alert.alert(
          'Error',
          'This content name already exists. Please choose a different name.'
        );
      }
    } else {
      Alert.alert('Error', 'Person upload cancelled.');
    }
  };

  return (
    <Button
      mode="contained"
      icon="camera"
      onPress={handleImagePick}
      style={{
        backgroundColor: '#590D8C' , 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
      }}
      labelStyle={{ fontSize: 16 }} 
    >
      Upload Person
    </Button>
  );
};

export default UploadMemory;