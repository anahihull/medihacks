import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Timeline from '../components/Timeline';
import UploadMemory from '../components/UploadMemory';

const MemoriesView = () => {
    const [memories, setMemories] = useState([
        { id: 1, content: 'Memory 1', start: '2023-09-01', image: null },
        { id: 2, content: 'Memory 2', start: '2023-09-05', image: null },
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
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Memories View</Text>
            <UploadMemory memories={memories} onNewMemory={handleNewMemory} />
            <Timeline memories={memories} />
            {memories.map(memory => (
                memory.image ? <Image key={memory.id} source={{ uri: memory.image }} style={{ width: 100, height: 100 }} /> : null
            ))}
        </View>
    );
}

export default MemoriesView;
