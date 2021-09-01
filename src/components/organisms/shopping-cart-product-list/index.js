import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';
import { VerticalSeparator } from '_atoms';
import { ShoppingCartProductListItem } from '_molecules';

const ShoppingCartProductList = (props) => {
    return (
        <View>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={props.items}  
                renderItem={({item}) => <ShoppingCartProductListItem 
                isBrief={props.isBrief} {...item}/>}
                ItemSeparatorComponent= {() => <VerticalSeparator opacity={0.3}/>}
            />
        </View>
    );
};

export default ShoppingCartProductList;