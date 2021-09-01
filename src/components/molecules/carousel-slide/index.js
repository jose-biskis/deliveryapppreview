import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Button} from 'react-native-elements';
import styles from './style'

const CarouselSlide = (props) => {
  const { imageUrl, type } = props.item;
  let toRender = null;
  if(type != 'button') {
    toRender =  (
      <ImageBackground
          source= { imageUrl }
          style= { 
            {
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
              aspectRatio: 300/125,
              width: '100%'
            }
          }
      >
      </ImageBackground>
        );
  } else {
    toRender = (
      <Button 
          raised
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
          title="Ver más"
          containerStyle= { styles.buttonContainer }
          buttonStyle= { styles.button }
          onPress={props.onShowMore}
      />
    );
  }

  return (
    <TouchableOpacity 
      onPress={() => {
        if(type != 'button') {
          props.onPressItem(props.item);
        } 
      }}
      style={[styles.slide]}>
          { toRender }
    </TouchableOpacity>
  );
}

export default CarouselSlide;