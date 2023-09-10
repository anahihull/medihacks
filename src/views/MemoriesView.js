import React, { useState } from 'react';
import { View , Alert, StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';
import Timeline from '../components/Timeline';
import UploadMemory from '../components/UploadMemory';
import { Portal, Dialog, Paragraph, Button, PaperProvider, DefaultTheme, ActivityIndicator } from 'react-native-paper';


const MemoriesView = () => {
    const [memories, setMemories] = useState([
        { id: 1, content: 'Rocking', start: '2023-09-01', image: 'https://i.pinimg.com/564x/09/2f/a9/092fa922b4c5f25779f51b5703d18476.jpg' },
        { id: 2, content: 'Family dinner', start: '2023-09-05', image: 'https://i.pinimg.com/564x/92/21/4f/92214f87b877c19aa90839684ac94c81.jpg' },
        { id: 3, content: 'Thanksgiving', start: '2023-09-01', image: 'https://i.pinimg.com/564x/5d/3f/75/5d3f7533c84e784351e28dcc3b92c871.jpg' },
        { id: 4, content: 'Day at the park', start: '2023-09-05', image: 'https://i.pinimg.com/564x/4f/b4/69/4fb46920c818a33cdcc276578efe39a8.jpg' },
    ]);

    const handleNewMemory = (newMemory) => {
        setMemories(prevMemories => [
            ...prevMemories,
            {
                id: prevMemories.length + 1,
                content: newMemory.content,
                start: newMemory.start,
                image: newMemory.image
            }
        ]);
    Alert.alert("Success", "Image added successfully!"); // Show an alert
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.timeline} >
                    <Timeline memories={memories}/>
                    <UploadMemory memories={memories} onNewMemory={handleNewMemory} />
                </View>
               
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#D8BAD9',
        height: 700,
        padding: 0,
        margin: 0,
        justifyContent: 'center'
    },
    timeline: {
         margin: 20
    }
})
export default MemoriesView;

