import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';

const MemoriesTimeline = ({ memories }) => {
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
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
        }, 3000); // Cambia cada 3 segundos

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }, [activeIndex]);

    return (
        <View style={{ marginBottom: 20 }}>
            {/* Image Slider */}
            <FlatList
                ref={flatListRef}
                data={memories}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: sliderWidth, height: 300 }}
                    />
                )}
                pagingEnabled
                horizontal
                onScrollToIndexFailed={console.error}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewabilityConfig.current}
            />

            {/* Memory Dots and Content */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {memories.map((memory, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: activeIndex === index ? 'blue' : 'gray',
                                marginRight: 10
                            }}
                        ></View>
                        <Text>{memory.content}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default MemoriesTimeline;
