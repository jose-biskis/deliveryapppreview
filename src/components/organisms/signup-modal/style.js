import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    height: 'auto',
  },
  inputContainerStyle: {
      marginBottom: 0,
      marginTop: 0,
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: '#ECF0F1',
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
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
},
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)'
     // marginBottom: -15
    },
    modalView: {
      height: '90%',
      width: '100%',
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
      paddingBottom: 0,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 20
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 15,
      textAlign: "center"
    }
});

export default styles;
