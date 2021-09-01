import React from 'react';
import styles from './style';
import { View, FlatList, Alert, Text } from 'react-native';
import { BannerListItem } from '_molecules';

const BannerList = (props) => {
    const items = props.items;

    return (
        <View 
            style= {styles.container}
        >
            {
                props.isLoading && 
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: 'left'  }}>Cargando...</Text>
            } 
            {
                !props.isLoading &&
                <FlatList
                    onEndReached={props.onEndReached}
                    showsVerticalScrollIndicator={false}
                    style= {styles.list}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <BannerListItem item={item}  onPressItem={props.onPressItem} />}
                /> 
            }
        </View>
    );
};

export default BannerList;