import React from 'react';
import { View } from 'react-native';

const VerticalSeparator = (props) => {
    const backgroundColor = `rgba(0,0,0,${props.opacity || 1})`;

    return (
        <View style={[{
            height: 1,
            width: '100%',
            backgroundColor: backgroundColor
        },props.style]}></View>
    );
};

export default VerticalSeparator;