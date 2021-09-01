import React, {useState} from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { QuantityButton, ProductListItem } from '_molecules';

const ProductList = (props) => {
    /*const items = props.itemsToShow 
                        ? props.items.slice(0, props.itemsToShow)
                        : props.items;*/

    const items = props.items;
    const onRenderItem = ({ item }) => <ProductListItem item={item} onSelectProduct={props.onSelectProduct} />;
    const onKeyExtractor = (item, index) => index.toString();

    return (
        <View 
            style= {
                {
                    flex: 1,
                    flexDirection: "column",                     
                    alignSelf: "center",
                    width: '100%'
                }
            }
        >
            { (props.title) && <Text style={ { fontSize: 20, marginBottom: 10 }}>{props.title}</Text> }   
            {
                props.isLoading && 
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: 'left'  }}>Cargando...</Text>
            } 
            {
                !props.isLoading && items && items.length > 0 &&
                <FlatList
                    style= {{
                        flex: 1,
                        flexDirection: "column"
                    }}
                    onEndReached={props.onEndReached}                    
                    data={items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={onKeyExtractor}
                    renderItem={onRenderItem}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    initialNumToRender={20}
                />
            }
            {
                !props.isLoading && (!items || items.length < 1) &&
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: props.title ? 'left' : 'center' }}>No se han encontrado elementos</Text>
            }
        </View>
    );
};

export default ProductList;