import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 306,
        flex: 1,
        flexDirection: "column",
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#030303',
        overflow: 'hidden',
        alignSelf: "center"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    }
});

export default styles;