import React from 'react';
import styles from './style';
import { View, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SquareListItem } from '_molecules';

const SquareList = (props) => {
    const items = props.items;

    let list = null;

    if(props.itemsPerRow) {
        list = (
            <FlatList
                onEndReached={props.onEndReached}
                numColumns={props.itemsPerRow}
                style= {styles.list}
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <SquareListItem 
                    aspectRatio={props.aspectRatio || 1} 
                    hasSubtitle={props.hasSubtitle} 
                    item={item} 
                    onPressItem={props.onPressItem} 
                    />}
            />
        );
    } else {
        list = (
            <FlatList
                onEndReached={props.onEndReached}
                columnWrapperStyle={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
                numColumns={2}
                style= {styles.list}
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <SquareListItem 
                    aspectRatio={props.aspectRatio || 1} 
                    hasSubtitle={true} 
                    item={item} 
                    onPressItem={props.onPressItem} 
                    />}
            />
        );
    }

    return (
        <View 
            style= {styles.container}
        >
            { (props.title) && <Text style={ { fontSize: 20, marginBottom: 10 }}>{props.title}</Text>}
            {
                props.isLoading && 
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: 'left'  }}>Cargando...</Text>
            }           
            { 
               !props.isLoading && items && items.length > 0 && list
            }
            {
                !props.isLoading && (!items || items.length < 1) &&
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: props.title ? 'left' : 'center'  }}>No se han encontrado elementos</Text>
            }
            {
                !props.isLoading && (items && items.length > 0 && props.hasShowMore) &&
                <Button 
                    raised
                    title="Ver más"
                    containerStyle= { styles.buttonContainer }
                    buttonStyle= { styles.button }
                    onPress={props.onShowMore}
                />
            }


        </View>
    );
};

export default SquareList;