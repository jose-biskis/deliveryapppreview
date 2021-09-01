import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import { CarouselStat, CarouselSlide } from '_molecules';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style'

const Carousel = (props) => {
  let self;
  const { style } = props;
  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  // const items = [...props.items, ...[{ type:'button'}]];
  const items = props.items;

  const [customInterval, setCustomInterval] = useState(1);
  const [floatInterval, setFloatInterval] = useState(1);
  const [intervals, setIntervals] = useState(1);
  const [width, setWidth] = useState(0);
  
  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
    
    
  }

  /**
   * 
   * @param {*} newInterval 
   * Positive is forward, Negative is Backward
   */
  const getDirection = (newInterval) => {
    return newInterval - floatInterval;
  }

  const getCustomInterval = (offset) => {  
    return ((offset / (width / intervals)) + 1);
  }

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: (customInterval === i ? 0.5 : 0.1)
        }}
      >
        &bull;
      </Text>
    );
  }
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if(customInterval < intervals) {
        self.scrollToIndex({ index: customInterval}); 
        setCustomInterval(customInterval + 1);    
      } else {
        self.scrollToIndex({ index: 0});  
        setCustomInterval(1);  
      }    
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  });
  
  return (
    <View>
      {
        props.hasShowMore && 
        <TouchableOpacity
          onPress={props.onShowMore}
          style={ { marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={ { fontSize: 20, marginRight: 10}}>Promociones</Text>
          <Icon
            name="search-plus"
            size={20}
            color="rgba(249,22,116,1)"
            />
        </TouchableOpacity>
      }
      {
        !props.hasShowMore &&
        <Text style={ { fontSize: 20, marginBottom: 5 }}>Promociones</Text>
      }

      

      <View style={styles.container} >
        <FlatList
          ref={value => self= value}
          data={items}
          keyExtractor={ (item, index) => index.toString()}
          horizontal={true}
          contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(w, h) => init(w)}
          onScrollEndDrag={data => {
            setWidth(data.nativeEvent.contentSize.width);
            let newInterval = getCustomInterval(data.nativeEvent.contentOffset.x);

            const direction = getDirection(newInterval);
            let intervalIndex = 0;
            let intInterval = customInterval;

            if(direction > 0) {     
              intInterval = Math.ceil(newInterval);      
            } 
            if(direction < 0) {
              intInterval = Math.floor(newInterval);                         
            }

            intervalIndex = intInterval - 1;

            if(intervalIndex < intervals && intervalIndex >= 0) {
              self.scrollToIndex({ index: intervalIndex});
            } 


            setFloatInterval(newInterval);
            setCustomInterval(intInterval);

          }}
          scrollEventThrottle={200}
          //pagingEnabled
          decelerationRate="fast"
          renderItem={({item}) => {
              if(style === 'stats') {
                return (
                    <CarouselStat
                      label={item.label}
                      value={item.value}
                    />
                  );
            } else {
              return (
                    <CarouselSlide
                      onShowMore={props.onShowMore}
                      item={item}
                      onPressItem={props.onPressItem}
                    />
                  )
            }
          }
        
        }
        />
        <View style={styles.bullets}>
          {bullets}
        </View>
      </View> 
    </View>

  )
}

export default Carousel;