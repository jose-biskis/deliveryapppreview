import React from 'react';
import styles from './style';
import { TouchableOpacity, ImageBackground } from 'react-native';

const BannerListItem = ({item, onPressItem}) => {
    return (
        <TouchableOpacity 
            style= { styles.container }
            onPress={() => {
                onPressItem(item);
            }}
        >
            <ImageBackground
                        source= { item.imageUrl }
                        style= {{
                            height: "100%",
                            aspectRatio: 300/125
                        }}
                    >
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default BannerListItem;

