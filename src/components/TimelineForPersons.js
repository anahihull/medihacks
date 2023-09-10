import React from 'react';
import { View, Text } from 'react-native';

const MemoriesTimeline = ({ memories }) => {
  return (
    <View>
      {memories.map((memory, index) => (
          <Text>{memory.content}</Text>
      ))}
    </View>
  );
}

export default MemoriesTimeline;
