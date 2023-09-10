import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, Text, Modal, TouchableOpacity } from 'react-native';
import { Card , Title} from 'react-native-paper';

const MemoriesTimeline = ({ memories }) => {
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const sliderWidth = Dimensions.get('window').width;

    const onViewRef = useRef((viewableItems) => {
        setActiveIndex(viewableItems.viewableItems[0].index);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeIndex < memories.length - 1) {
                setActiveIndex(prevIndex => prevIndex + 1);
                flatListRef.current.scrollToOffset({
                    offset: (activeIndex + 1) * sliderWidth,
                    animated: true,
                });
            } else {
                setActiveIndex(0);
                flatListRef.current.scrollToOffset({
                    offset: 0,
                    animated: true,
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handlePhotoPress = (memory) => {
        setSelectedMemory(memory);
        setModalVisible(true);
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <FlatList
                ref={flatListRef}
                data={memories}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePhotoPress(item)}>
                        <Card style={{ width: sliderWidth }}>
                            <Card.Cover source={{ uri: item.image }} style={{ height: 300 }} />
                        </Card>
                    </TouchableOpacity>
                )}
                pagingEnabled
                horizontal
                onScrollToIndexFailed={console.error}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewabilityConfig.current}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <Title style={{ fontSize: 20, color: '#444', letterSpacing: 1, textTransform: 'capitalize' }}>
                    {memories[activeIndex].content}
                </Title>
            </View>
            
            {/* Modal for displaying photo details */}
            {selectedMemory && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Card.Cover source={{ uri: selectedMemory.image }} style={{ width: '90%', height: '50%' }} />
                        <Text style={{ marginTop: 20, fontSize: 18 }}>{selectedMemory.content}</Text>
                        <Text style={{ marginTop: 10, fontSize: 16 }}>{selectedMemory.start}</Text>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: 'blue' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default MemoriesTimeline;
