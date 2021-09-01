import React from 'react';
import { SectionListItem } from '_molecules';
import { View, FlatList } from 'react-native';


const SectionList = (props) => {
    const items = props.items;
    return (
        <View style={{
            minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                items && items.length > 0 &&
                <FlatList 
                    contentContainerStyle={
                        {
                        justifyContent: 'center',
                        alignItems: 'center'
                        }
                    }
                    onEndReached={props.onEndReached}   
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index)=> index.toString()}
                    data={props.items}
                    renderItem={({item}) =>  <SectionListItem item={item} onSelectItem={props.onSelectItem}/> }
                />
            }
        </View>
    );
}

export default SectionList;