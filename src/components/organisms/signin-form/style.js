import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
       // flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 15,
        width: "100%",
        //flexBasis: "auto",
        justifyContent: "flex-end",
        alignSelf: "flex-end"
    },
    input: {
        color: "black",
        fontSize: 12
    },
    label: {
        color: "black",
        fontSize: 12
    },
    button: {
        backgroundColor: "rgba(249,22,116,1)"
    },
    text: {
        alignSelf: "center",
        fontSize: 35,
        marginBottom: 15,
        textAlign: 'center'

    },
    inputContainer: {
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonContainer: {
        width: "25%",
        alignSelf: "center",
       // flexBasis: "auto"
    },
    formContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
       height: 'auto'
    }
});

export default styles;