import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0
    },
    inputContainerStyle: {
        flexDirection: 'row-reverse',
        borderRadius: 5,
        backgroundColor: '#ECF0F1',
        height: 30
    },
    rightIconContainerStyle: {
        marginLeft: 8,
    },
    leftIconContainerStyle: {
        marginRight: 8,
    },
    iconStyle : {
        color: '#030303',
        fontSize: 20
    },
    fontStyle : {
        color: '#030303',
        fontSize: 14
    }
});

export default styles;