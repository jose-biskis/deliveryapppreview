import React from 'react';
import styles from './style';
import { View, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { OrderListItem } from '_molecules';
import { VerticalSeparator } from '_atoms';

const OrderList = (props) => {
    const items = props.items;
    const displayType = props.displayType ? props.displayType : 'default';

    let list = null;

    if(displayType === 'default') {
        list = (
            <FlatList
            
            style= { {
                flex: 1,
                flexDirection: "column"
              }}
            data={items}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
             <OrderListItem onSelectOrder={props.onSelectOrder} data={item} displayType={displayType} />
            }
        />
        );
    }

    if(displayType === 'home') {
        list = (
            <FlatList
            ItemSeparatorComponent={() => <VerticalSeparator opacity={0.2} />}
            style= { {
                flex: 1,
                flexDirection: "column"
              }}
            data={items}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) =>
             <OrderListItem onSelectOrder={props.onSelectOrder} data={item} displayType={displayType} />
            }
        />
        );
    }

    return (
        <View 
            style= {{
                flex: 1,
                flexDirection: "column",                     
                alignSelf: "center",
                width: '100%'
            }}
        >
            {list}
        </View>
    );
};

export default OrderList;