import React, { useState } from 'react';
import { View , Alert} from 'react-native';
import { Appbar } from 'react-native-paper';
import Timeline from '../components/Timeline';
import UploadMemory from '../components/UploadMemory';


const MemoriesView = () => {
    const [memories, setMemories] = useState([
        { id: 1, content: 'Memory 1', start: '2023-09-01', image: 'https://img.freepik.com/free-photo/young-family-with-their-sons-home-having-fun_1303-20999.jpg?w=1380&t=st=1694294471~exp=1694295071~hmac=ebc373e66eff7bceb7daaf5f4956d3a6a6bbd80ac24c0d5251de17cc84624f5b' },
        { id: 2, content: 'Memory 2', start: '2023-09-05', image: 'https://img.freepik.com/free-photo/happy-family-with-dog-moving-new-home_23-2149749175.jpg?w=1060&t=st=1694294533~exp=1694295133~hmac=256897d000ea1535d688ed3d05ba2af80d902aa29f1bb33e3743577da7a25939' },
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
        <View style={{ flex: 1 , backgroundColor: '#f0daf7'}}>
        <Appbar.Header style={{ backgroundColor: '#f0daf7'}}>
        <Appbar.Content titleStyle={{ fontSize: 24, fontWeight: 'bold' }} title="Slideshow View" />
        </Appbar.Header>
        <View style={{ padding: 20 }}>
            <Timeline memories={memories} />
            <UploadMemory memories={memories} onNewMemory={handleNewMemory} />
        </View>
    </View>
    );
}

export default MemoriesView;
