import React from 'react';
import styles from './style';
import { TouchableOpacity, ImageBackground, Text } from 'react-native';

const SquareListItem = ({onPressItem, item, aspectRatio, hasSubtitle}) => {

    return (
        <TouchableOpacity 
            style= { [styles.container,
                {
                    width: aspectRatio == 1 ? '49%' : '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio,
                    marginBottom: aspectRatio == 1 ? 10 : 5
                }
            ] }
            onPress={() => {
                onPressItem(item);
            }}
        >
            <ImageBackground
                source= { item.imageUrl }
                style= { [styles.image, {
                    aspectRatio
                }] }
            >
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default SquareListItem;

