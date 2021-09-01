import React from 'react';
import styles from './style';
import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'react-native-elements';

const firstStateActiveImage = require('_assets/firstStateActive.png'); 
const secondStateActiveImage = require('_assets/secondStateActive.png'); 
const thirdStateActiveImage = require('_assets/thirdStateActive.png'); 
const fourthStateActiveImage = require('_assets/fourthStateActive.png'); 

const firstStateInactiveImage = require('_assets/firstStateInactive.png'); 
const secondStateInactiveImage = require('_assets/secondStateInactive.png'); 
const thirdStateInactiveImage = require('_assets/thirdStateInactive.png'); 
const fourthStateInactiveImage = require('_assets/fourthStateInactive.png'); 


const OrderListItem = (props) => {
    const data = props.data;
    const onSelectOrder = props.onSelectOrder;
    const type = props.displayType ? props.displayType : 'default';

    let component = null;

    if(type === 'default') {
        component = (
            <OrderListItemDefaultDisplay
                data={data}
                onSelectOrder={onSelectOrder}
            />
        );
    }

    if(type === 'home') {
        component = (
            <OrderListItemHomeDisplay
                data={data}
                onSelectOrder={onSelectOrder}
            />
        );
    }

    return (
        <View>
            {component}
        </View>
    );
};

const OrderListItemHomeDisplay = ({data, onSelectOrder}) => { 
    let statusId = data.status.id;
    return (
        <TouchableOpacity 
            onPress={() => {
                onSelectOrder(data);
            }}
            style= { {
                width: '100%',
                flex: 1,
                paddingRight: 15,
                paddingLeft: 15,
                paddingTop: 15,
                flexDirection: "column",
                marginBottom: 10,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                alignSelf: "center",
                justifyContent: "space-around",
              } }
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 2
                }}
            >
                <StateIcon imageUrl={statusId > 1 ? firstStateInactiveImage: firstStateActiveImage}  />
                <StateIcon imageUrl={statusId > 2 ? secondStateInactiveImage: secondStateActiveImage} />
                <StateIcon imageUrl={statusId > 3 ? thirdStateInactiveImage: thirdStateActiveImage} />
                <StateIcon imageUrl={statusId > 4 ? fourthStateInactiveImage: fourthStateActiveImage} />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >   

                <View style={{flex: 1}}></View>      
                <Text style={ { fontWeight: 'bold', flex: 1, textAlign:'center'}}>{data.status.name}</Text> 
                
                <Text style={ { fontWeight: 'bold', flex: 1, textAlign:'right'}}>{data.id}</Text>    
            </View>

        </TouchableOpacity>
    );
};

const StateIcon = ({imageUrl}) => {
    return (
        <View style={
                {
                    height: 50,
                    aspectRatio: 1,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
            <Image    
            style={
                {
                    height: 50,
                    aspectRatio: 1,
                    borderRadius: 100,
                }
            }
            source={ imageUrl }/>
        </View>
    );
}

const OrderListItemDefaultDisplay = ({data, onSelectOrder}) => {
    const totalStatus = 5;
    let progress = (data.status.id * 100) / totalStatus;
    let progressClass = `${progress}%`

    return (
        <TouchableOpacity 
            onPress={() => {
                onSelectOrder(data);
            }}
            style= { {
                height: 60,
                width: '100%',
                flex: 1,
                padding: 15,
                flexDirection: "column",
                marginBottom: 10,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                elevation: 4,
                overflow: 'hidden',
                alignSelf: "center",
                justifyContent: "space-around",
              } }
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={ { fontWeight: 'bold'}}>Código: {data.id}</Text>
                <Text style={ { fontWeight: 'bold'}}>{data.status.name}</Text>
            </View>
            <View style={
                {   
                    height: 10,
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderColor: '#000',
                    borderWidth: 1,
                    borderRadius: 5,
                    overflow: "hidden"
                } 
            }>
                <View style={
                    {   
                        height: "100%",
                        width: progressClass,
                        backgroundColor: 'rgba(249,22,116,1)',
                    }
                }></View>
            </View>

        </TouchableOpacity>
    );
}

export default OrderListItem;

