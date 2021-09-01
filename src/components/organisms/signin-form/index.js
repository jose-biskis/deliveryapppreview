import React, { useState, useEffect } from 'react';
import styles from './style';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { Input, Button  } from 'react-native-elements';

const useInputArray = (step) => {
    const [inputs, setInputs] = useState(null);

    useEffect(() => {
        setInputs([...step.inputs])
    }, [step]);

    const onChangeText = (value, idx) => {
        const updatedInputs = [...inputs];
        updatedInputs[idx].value = value;
        setInputs([...updatedInputs]);
    };
    return [inputs, onChangeText];
}

const SigninForm = ({step, onNextStep, onExclusiveSignin, hasExclusiveSignin}) => {
    [inputs, onChangeText] = useInputArray(step);

    const onPressButton = () => {  
        onNextStep(inputs);
    }

    return (
        <View
        style={ styles.container }
        >
            <Text
                style={ styles.text }
            >
                { step.title }
            </Text>
            <View 
                style= { styles.formContainer }
            >
            {  
                inputs && inputs.map((input, idx) => {
                    return (
                        (step.step != 3) ? (
                            <Input 
                                editable={input.editable}
                                keyboardType={ input.type || 'default'}
                                key={idx}
                                placeholder={input.placeholder}
                                label={input.label}
                                inputStyle= { styles.input }
                                labelStyle= { styles.label }
                                inputContainerStyle= { [styles.inputContainer,{
                                    backgroundColor: input.editable ? '#ffffff' : '#e3e3e3'
                                }] }
                                value={ inputs[idx].value }
                                onChangeText = { (value) => onChangeText(value, idx) } 
                            />
                        ) : (
                            <CodeInput 
                                key={idx}
                                //value={ inputs[idx].value }
                                onChangeValue = { (value) => onChangeText(value, idx) } 
                            />
                        ) 
                    )
                      
                })
            }
            </View>
            {
                hasExclusiveSignin && 
                <View>
                    <Text
                        onPress={onExclusiveSignin}
                        style={{
                            textAlign:'center',
                            color: 'rgba(249,22,116,1)',
                            marginBottom: 20,
                            fontSize: 15
                        }}
                    >
                        Iniciar sesión como invitado
                    </Text>
                </View>
            }
            <Button 
                    raised
                    title={ step.buttonText }
                    onPress={ onPressButton }
                    containerStyle= { styles.buttonContainer }
                    buttonStyle= { styles.button }
                />
        </View>
    );
    
};

const CodeInput = (props) => {
    const [values, setValues] = useState([
        "",
        "",
        "",
        ""
    ]);
    let fieldsRef = []; 

    const onChangeValue = (value, idx) => {
        const newValues = values.map((item, itemIdx) => {
            if (itemIdx == idx) {
                item = value;
            }
            return item;
        });
        setValues(newValues);

        props.onChangeValue(newValues.reduce((previousValue, value) => {
            return previousValue + value;
        }, ""));

        if(value) {
            if(idx < 3) {
                fieldsRef[idx + 1].focus();
            }
        } else {
            if(idx > 0) {
                fieldsRef[idx - 1].focus();
            }
        }
    };

    return (
        <View style={ {
            flexDirection: 'column',
            height: 'auto',
            justifyContent: 'flex-start',
            alignItems: 'flex-start', 
            marginBottom: 10,
            paddingBottom: 16,
            paddingLeft: 10,
            paddingRight: 10
        }          
        }>
            <Text style={{
                fontSize: 12,
                fontWeight: 'bold'
            }}>Código</Text>
            <View style={ {
            flexDirection: 'row',
            height: 'auto',
        }          
        }>
            <TextInput
                ref={(value) => fieldsRef[0] = value}
                numberOfLines={1}
                keyboardType='numeric'
                maxLength={1}
                editable={true}
                style={
                    {  
                        textAlign:'center', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: "black",
                        fontSize: 12 ,
                        borderWidth: 1,
                        borderRadius: 5,  
                        borderColor: 'rgba(0,0,0,0.5)',
                        marginRight: 5,
                        flex: 1,
                        flexGrow: 1,
                        height: 42,                     
                        paddingLeft: 10,
                        paddingRight: 10,
                    }
                }
                placeholder=""
                value={ values[0] }
                onChangeText={(text) => onChangeValue(text, 0)}
            />
            <TextInput
                ref={(value) => fieldsRef[1] = value}
                numberOfLines={1}
                keyboardType='numeric'
                maxLength={1}
                editable={true}
                style={
                    {
                        textAlign:'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: "black",
                        fontSize: 12 ,
                        borderWidth: 1,
                        borderRadius: 5,  
                        borderColor: 'rgba(0,0,0,0.5)',
                        marginRight: 5,
                        flex: 1,
                        flexGrow: 1,
                        height: 42,                     
                        paddingLeft: 10,
                        paddingRight: 10
                    }
                }
                placeholder=""
                value={ values[1] }
                onChangeText={(text) => onChangeValue(text, 1)}
            />
            <TextInput
                ref={(value) => fieldsRef[2] = value}
                numberOfLines={1}
                keyboardType='numeric'
                maxLength={1}
                editable={true}
                style={
                    {
                        textAlign:'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: "black",
                        fontSize: 12 ,
                        borderWidth: 1,
                        borderRadius: 5,  
                        borderColor: 'rgba(0,0,0,0.5)',
                        marginRight: 5,
                        flex: 1,
                        flexGrow: 1,
                        height: 42,                     
                        paddingLeft: 10,
                        paddingRight: 10
                    }
                }
                placeholder=""
                value={ values[2] }
                onChangeText={(text) => onChangeValue(text, 2)}
            />
            <TextInput
                ref={(value) => fieldsRef[3] = value}
                numberOfLines={1}
                keyboardType='numeric'
                maxLength={1}
                editable={true}
                style={
                    {
                        textAlign:'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: "black",
                        fontSize: 12 ,
                        borderWidth: 1,
                        borderRadius: 5,  
                        borderColor: 'rgba(0,0,0,0.5)',
                        flex: 1,
                        flexGrow: 1,
                        height: 42,                     
                        paddingLeft: 10,
                        paddingRight: 10
                    }
                }
                placeholder=""
                value={ values[3] }
                onChangeText={(text) => onChangeValue(text, 3)}
            />
            </View>
        </View>
    );
}

export default SigninForm;


