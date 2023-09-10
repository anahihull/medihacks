import React from 'react';
import { View, Text } from 'react-native';

const MemoriesTimeline = ({ memories }) => {
  return (
    <View>
      {memories.map((memory, index) => (
        <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'blue', marginRight: 10 }}></View>
          <Text>{memory.content}</Text>
        </View>
      ))}
    </View>
  );
}

export default MemoriesTimeline;
