import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    sectionContainer: {
        marginTop: 10,
        alignSelf: "center"
    },
    list: {
        flex: 1,
        flexDirection: "column"
    }
});

export default styles;