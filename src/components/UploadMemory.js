import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadMemory = ({ memories, onNewMemory }) => {

    const isContentNameUnique = (name) => {
        return !memories.some(memory => memory.content === name);
    }

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

        const content = await new Promise(resolve => {
            Alert.prompt(
                'Memory Content Name',
                'Enter the memory content name:',
                [{
                    text: 'Cancel',
                    onPress: () => resolve(null),
                    style: 'cancel',
                }, {
                    text: 'OK',
                    onPress: content => resolve(content)
                }],
                'plain-text'
            );
        });

        const start = await new Promise(resolve => {
            Alert.prompt(
                'Memory Date or Text',
                'Enter a date or any text for this memory:',
                [{
                    text: 'Cancel',
                    onPress: () => resolve(null),
                    style: 'cancel',
                }, {
                    text: 'OK',
                    onPress: text => resolve(text)
                }],
                'plain-text'
            );
        });

        if (content && start) {
            const newMemory = {
                content,
                start,
                image: result.assets[0].uri
            };
            
            if (isContentNameUnique(content)) {
                onNewMemory(newMemory);
            } else {
                Alert.alert('Error', 'This content name already exists. Please choose a different name.');
            }
        } else {
            Alert.alert('Error', 'Memory upload cancelled.');
        }
    };

    return <Button title="Upload Memory" onPress={handleImagePick} />;
}

export default UploadMemory;
