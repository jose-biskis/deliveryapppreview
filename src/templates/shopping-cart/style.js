import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        height: 'auto'
      },
      sectionContainer: {
          marginTop: 10,
          width: '100%',
          alignSelf: "center",         
          paddingLeft: 15,
          paddingRight: 15
      },
      list: {
          flex: 1,
          flexDirection: "column"
      }
});

export default styles;
