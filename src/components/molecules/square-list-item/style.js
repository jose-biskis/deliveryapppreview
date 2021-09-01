import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
       // height: 100,
       // width: 100,
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        alignSelf: "center"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      }
});

export default styles;