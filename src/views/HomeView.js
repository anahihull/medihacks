import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, Alert, Text } from 'react-native';
import { TextInput, Button, Card, Paragraph, List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const HomeView = () => {
  const [description, setDescription] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');
  const [openedEntryIndex, setOpenedEntryIndex] = useState(null);

  const initialDiaryEntries = [
    {
      title: 'A sunny day',
      content: 'Today was a day full of sun and laughter. I felt really good and enjoyed the outdoors.',
    },
    {
      title: 'Family memories',
      content: 'I looked at old family photos and remembered happy times we spent together.',
    },
  ];

  const [diaryEntries, setDiaryEntries] = useState(initialDiaryEntries);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
    setHasSubmitted(true);
  };

  const promptForTitleAndAddEntry = () => {
    Alert.prompt(
      'Title of the Journey',
      'Please, Introduce a title for your journey',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: title => {
            if (currentEntry && title) {
              setDiaryEntries(prevEntries => [...prevEntries, { title, content: currentEntry }]);
              setCurrentEntry('');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleToggleEntry = (index) => {
    if (openedEntryIndex === index) {
      setOpenedEntryIndex(null);
    } else {
      setOpenedEntryIndex(index);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Who am I?</Text>
          </View>
          <Card.Content>
            {
              hasSubmitted ? 
              <Paragraph>{description}</Paragraph> :
              <TextInput
                label="Describe who you are"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
                style={styles.input}
              />
            }
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            setShowDiary(!showDiary);
          }}
        >
          Desplay diaries
        </Button>

        {showDiary && (
          <View style={styles.diaryContainer}>
            <TextInput
              label="Content"
              value={currentEntry}
              onChangeText={setCurrentEntry}
              multiline
              numberOfLines={5}
              style={styles.input}
            />
            <Button mode="text" onPress={promptForTitleAndAddEntry}>
              Add
            </Button>
            <FlatList
              data={diaryEntries}
              renderItem={({ item, index }) => (
                <View style={styles.diaryEntry}>
                  <List.Item 
                    title={item.title} 
                    style={styles.entryTitle} 
                    onPress={() => handleToggleEntry(index)}
                  />
                  {openedEntryIndex === index && <List.Item description={item.content} style={styles.entryContent} />}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: '#674FA3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  diaryContainer: {
    marginTop: 20,
  },
  diaryEntry: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  entryContent: {
    fontSize: 15,
    color: '#666',
    padding: 10,
  },
});

export default HomeView;
