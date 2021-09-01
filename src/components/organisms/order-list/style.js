import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",                     
        alignSelf: "center"
    },
    list: {
      flex: 1,
      flexDirection: "column"
    },
    button: {
      backgroundColor: "rgba(249,22,116,1)"
    },
    buttonContainer: {
      width: "25%",
      alignSelf: "center",
      flexBasis: "auto",
      marginTop: 10
    }
    
});

export default styles;