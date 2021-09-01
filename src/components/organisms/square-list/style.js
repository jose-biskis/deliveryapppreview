import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",                     
        alignSelf: "center",
        width: '100%'
    },
    list: {
     // flex: 1,
      flexDirection: "column",
      width: '100%'
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