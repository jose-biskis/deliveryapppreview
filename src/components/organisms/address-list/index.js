import React, { useState, useEffect } from 'react';
import styles from './style';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'


const AddressList = (props) => {
    //const items = props.items.slice(0, props.itemsToShow)
    const items = props.items;

    return (
        <View 
            style= {{
                flex: 1,
                flexDirection: "column",                     
                alignSelf: "center",
                width: '100%',
            }}
        >
            <FlatList
                style= { {
                    flex: 1,
                    flexDirection: "column"
                  }}
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <AddressListItem onDeleteAddress={props.onDeleteAddress} onSelectAddress={props.onSelectAddress} data={item} />}
            />
        </View>
    );
};

const AddressListItem = ({onSelectAddress, onDeleteAddress, data}) => {
    //const [checked, setChecked] = useState(false);
    let hasInfo = data.info ? true : false;

    return (
        <TouchableOpacity 
            onPress={() => {
                //setChecked(!checked);
                console.log('complete row clicked');
                onSelectAddress(data);
            }}
            style= { {
                height: 'auto',
                width: '100%',
                flex: 1,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: hasInfo ? 10 : 0 ,
                paddingBottom: hasInfo ? 10 : 0,
                flexDirection: "row",
                marginBottom: 5,
                backgroundColor: 'white',
                elevation: 0,
                overflow: 'hidden',
                alignSelf: "center",
                justifyContent: "space-between",
                alignItems:'center'
              } }
        >
            <View style={{
                width: '70%',
                flexDirection: 'column',
                height: 'auto'
            }}>
                <Text
                    numberOfLines={1}
                    style={{
                        width: '100%',
                        height: 20
                    }}
                >
                    {data.name} : {data.address}
                </Text>
                {
                    hasInfo &&
                    <Text
                            numberOfLines={2}
                            style={{
                                width: '100%',
                            }}
                        >
                        {data.info}
                    </Text>
                }
            </View>
            <View
                style={{
                    width: '20%',
                    alignItems:'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}
            >
            <CheckBox
                wrapperStyle={{
                    alignItems: 'center',
                    justifyContent:'center',
                    paddingTop: 3,
                }}
                
                checked={data.isSelected}
                onPress={() =>  {
                    //setChecked(!checked);
                    console.log('complete row clicked');
                    onSelectAddress(data);
                }}
                checkedColor="rgba(249,22,116,1)" 
                uncheckedColor="rgba(249,22,116,1)"
                size={20}
            />
            <Button
                icon={
                    <Icon
                    name="trash"
                    size={20}
                    color="rgba(249,22,116,1)"
                    />
                }
                
                onPress={ () => {
                    console.log('only delete button clicked');
                    onDeleteAddress(data);
                } }
                containerStyle= {  {
                    width: 'auto',
                } }
                buttonStyle= {  {
                    backgroundColor: "transparent"
                } }        
            /> 
            </View>

        </TouchableOpacity>
    );
};

export default AddressList;