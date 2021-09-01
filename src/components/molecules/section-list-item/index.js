import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SectionListItem = ({item, onSelectItem}) => {
    const backgroundColor = item.isCurrent ? 'rgba(249,22,116,1)' : '#FFFFFF';

    return (
        <TouchableOpacity
            onPress={() => {
                onSelectItem(item);
            }}
            style={
                {
                    height: 50,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: backgroundColor,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 5,
                    borderColor: 'rgba(249,22,116,1)',
                    borderWidth: 1,
                    flexDirection: 'column'
                }
            }
        >
           {item.isCurrent && <View
                style= {{
                    backgroundColor: '#FFFFFF',
                    height: 10,
                    width: 10,
                    borderRadius: 100,
                    alignSelf: 'flex-end',
                    marginTop: -10,
                    marginRight: -10
                }}
            ></View>
            }
            <Text style={{
                fontWeight: 'bold'
            }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

export default SectionListItem;