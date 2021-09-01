import React, { useEffect, useState } from 'react';
import { Alert, TextInput, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
const CustomTextInput = (props) => {
    let self = null;

    useEffect(() => {
        if(self) {
            self.focus();
        }
    }, [self]);

    return (
        <TextInput
                ref={value => self = value}
                value={props.value}
                style={{
                    fontSize: 20
                }}
                keyboardType='numeric'
                onChange={(event) => {                
                    const {text} = event.nativeEvent;

                    props.onChangeText(text);
                }}
                onBlur={() => {
                    if(!props.value) {
                       props.onChangeText("0");
                    }
                   props.onBlur();
                }}
                
        />
    );
}

const QuantityButton = (props) => {
   // const [count, setCount] = useState(props.count || 0);
    const [isInputSelected, setIsInputSelected] = useState(false);
    const count = props.count;

    let counterComponent = null;

    const onSetCount = (value) => {
        //setCount(value);
        props.onSetCount(value);
    }

    if(isInputSelected) {
        counterComponent = (
            <CustomTextInput 
                value={count.toString()}
                onBlur={() => {
                    setIsInputSelected(false);
                }}
                onChangeText={(value) => {
                    let valueToSet = 0;
                    if(value) {
                        if(!Number.isNaN(value)) {
                            let numValue = Number(value);
                            if(Number.isInteger(numValue)) {
                                valueToSet = numValue;
                            } else {
                                valueToSet = count;
                            }
                            
                        } else {
                            valueToSet = count;
                        }
                    } else {
                        valueToSet = value ;
                    }

                    onSetCount(valueToSet);

                }}
            />        
        );
    } else {
        counterComponent = (
            <Text        
                style={{
                        fontSize: 20
                }}
            >
                {count}
            </Text>
        );
    }


    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            width: props.width || 100,
            height: 40,
            alignItems: 'center',
            borderRadius: 10,
            borderStyle: props.borderStyle || 'dashed',
            borderWidth: 1,
            borderColor: 'rgba(249,22,116,1)'

        }}>
            {
                count > 0 ? (
                    <>
                    <TouchableOpacity 
                    style={{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        if((count -1) <= 0) {
                            Alert.alert(
                                "Alerta",
                                "¿Desea remover el producto del carrito de compras?",
                                [
                                  { text: "Sí", onPress: () => onSetCount(count - 1) },
                                  { text: "No" }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            onSetCount(count - 1);             
                        }
                        
                    }}>
                        <Text style={{
                            fontSize: 20
                        }}>-</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback 
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            setIsInputSelected(true);
                        }}
                    > 
                    { counterComponent }
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}onPress={() => onSetCount(count + 1)}>
                        <Text style={{
                            fontSize: 20
                        }}>+</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={{
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            
                        }}
                        onPress={() => {
                            onSetCount(1);
                        }}
                    >
                        <Text 
                            style={{
                                fontSize: 20
                            }}
                        >
                            Agregar
                        </Text>
                    </TouchableOpacity>
                )
            } 

        </View>
    );
}

export default QuantityButton;