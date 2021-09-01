import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        paddingBottom: 15
      },
      sectionContainer: {
          marginTop: 10,
          flex: 2,
          width: '100%',
          alignSelf: "center",
          paddingLeft: 10,
          paddingRight: 10
      },
      list: {
          flex: 1,
          flexDirection: "column"
      }
});

export default styles;
