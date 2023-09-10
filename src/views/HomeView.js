import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, Alert, Text } from 'react-native';
import { TextInput, Button, Card, Paragraph, List, PaperProvider } from 'react-native-paper';
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
    <PaperProvider>
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Who am I?</Text>
          </View>
          <Card.Content>
            {
              hasSubmitted ? 
              <Paragraph>Who am I? Memories might play hide and seek with me, but my heart always remembers love. Even in the fog, your kindness shines like a beacon. Every hug, every smile, feels like a sunbeam on a cloudy day.</Paragraph> :
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
          <PaperProvider>
          <View style={styles.diaryContainer}>
            <TextInput
              label="Content"
              value={currentEntry}
              onChangeText={setCurrentEntry}
              multiline
              numberOfLines={5}
              style={styles.input}
            />
            <Button mode="contained" style={styles.buttonadd} onPress={promptForTitleAndAddEntry}>
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
          </PaperProvider>
        )}
      </Animatable.View>
    </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#D8BAD9',
  },
  card: {
    margin: 10,
    backgroundColor: 'white'
  },
  cardHeader: {
    backgroundColor: "#590D8C",
    borderRadius: 10,
    margin: 10,
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
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: "#590D8C"
  },
  diaryContainer: {
    marginTop: 20,
  },
  diaryEntry: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#F2DCEB',
    elevation: 5,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    backgroundColor: 'transparent',
    borderRadius: 100
  },
  entryContent: {
    fontSize: 15,
    color: '#666',
    padding: 10,
  },
  buttonadd:{
    backgroundColor: "#590D8C",
    width: 100,
    alignSelf: 'center',
    marginBottom: 10,
    color: 'white'
  }
});

export default HomeView;
