import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  slide: {
  //  width: '100%',
    flexDirection: "column",
  //  marginBottom: 10,
  //  borderRadius: 15,
    backgroundColor: '#030303',
    overflow: 'hidden',
    alignSelf: "center",
    height:'100%',
    aspectRatio: 300/125
  },
  slideText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    aspectRatio: 300/125,
    width: '100%'
  },
  button: {
    backgroundColor: "rgba(249,22,116,1)",
    aspectRatio: 300/125,
    width: '100%',
  },
  buttonContainer: {
    aspectRatio: 300/125,
    width: '100%',
  }
});

export default styles;