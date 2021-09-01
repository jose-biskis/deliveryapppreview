import React, {useState} from 'react';
import { HeaderBar } from '_molecules';
import { SquareList, Carousel, OrderList } from '_organisms';
import { SafeAreaView, View, FlatList, StatusBar, ScrollView, TextInput, Text, Image, Alert } from 'react-native';
import { ButtonGroup, Input, Button } from 'react-native-elements';
import styles from './style';
import { FixedMenuButton, VerticalSeparator } from '_atoms';

const profileImage = require("../../assets/profile.png");

const ProfileTemplate = (props) => {
    return (
        <SafeAreaView style={styles.container}>        
                <StatusBar 
                    backgroundColor='rgba(249,22,116,1)' 
                    translucent={true} 
                    barStyle='light-content'/>
                <HeaderBar  hasShoppingCart={true}  addresses={props.addresses} hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
                <View
                    style={{ 
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                >
                    <VerticalSeparator opacity={0.5} />
                </View>
                <View style={[styles.sectionContainer, {
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingLeft: 15,
                    paddingRight: 15
                }]}>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold'
                        }}>Mi Perfil</Text>
                        <Text>Actualiza tus datos</Text>
                        <Text>personales</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <View style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 100,
                                    backgroundColor: '#FFFFFF',
                                    overflow: 'hidden',
                                    elevation: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                            <Image 
                                style={{
                                    height: 60,
                                    width: 60
                                }}
                                source={profileImage}
                            />
                        </View>
                    </View>
                </View>
                
                <View 
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignSelf: 'flex-end',
                    width: '100%',
                    height: '70%'
                }}>
                <View style={[
                    styles.sectionContainer,
                {
                    backgroundColor:'#FFFFFF',
                    elevation: 4,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    paddingTop: 10,
                }]}>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{
                        height: '100%'
                    }}>
                        {
                        props.data &&
                        <ProfileForm 
                            data={props.data}
                            onSubmit={props.onSave}
                        />
                        }
                    </ScrollView>
                </View>
                </View>
        </SafeAreaView>
    );
}

const ProfileForm = ({onSubmit, data}) => {
    [name, setName] = useState(data && data.name);
    [email, setEmail] = useState(data && data.email);
    [lastname, setLastname] = useState(data && data.lastname);
    [dni, setDni] = useState(data && data.dni);
    [birthdate, setBirthdate] = useState(data && data.birthdate);
    [phoneCode, setPhoneCode] = useState(data && data.phone.code);
    [phoneNumber, setPhoneNumber] = useState(data && data.phone.number);
    [gender, setGender] = useState(data && data.gender == 'male' ? 1 : 0);

    const showWarningAlert = (message) => {
        Alert
            .alert(
                'Alerta',
                message,
                [
                    {
                        text: 'OK'
                    }
                ],
                {
                    cancellable: false
                }
            )
    }

    const onPressButton = () => {
        var invalid = (new Date(birthdate));
        
        if(!name) {
            showWarningAlert('El nombre es requerido'); 
        } else if(!dni) {
            showWarningAlert('La identificación es requerida'); 
        } else if(!email) {
            showWarningAlert('El email es requerido'); 
        } else if(!birthdate) {
            showWarningAlert('La fecha de nacimiento es requerida'); 
        } else if(Number.isNaN(invalid.getDate())) {
            showWarningAlert('El formato de fecha es inválido');
        } else {
            onSubmit({
                name: name,
                lastname: lastname,
                dni: dni,
                email: email,
                phone: {
                    code: phoneCode,
                    number: phoneNumber,
                },
                birthdate: birthdate,
                gender: gender == 1 ? 'male' : 'female'
            });
        }
    }

    return (
        <View
        style={ {
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 15,
            width: "100%",
            justifyContent: "flex-end",
            alignSelf: "flex-end"
        } }
        >
            <View 
                style= { {
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    flexGrow: 2
                } }
            >
            <Input
                placeholder="John"
                label="Nombres"
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                errorStyle={{height: 0, margin: 0}}
                inputStyle= { {
                    color: "black",
                    fontSize: 18
                } }
                labelStyle= { {
                    color: "black",
                    fontSize: 14,
                    marginBottom: 5
                } }
                inputContainerStyle= { {
                    alignSelf: "center",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                } }
                value={ name }
                onChangeText = { setName } 
            />
            <Input
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                placeholder="Doe"
                label="Apellidos"
                errorStyle={{height: 0, margin: 0}}
                inputStyle= { {
                    color: "black",
                    fontSize: 18
                } }
                labelStyle= { {
                    color: "black",
                    fontSize: 14,
                    marginBottom: 5
                } }
                inputContainerStyle= { {
                    alignSelf: "center",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                } }
                value={ lastname }
                onChangeText = { setLastname } 
            />
            <Input
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                editable={true}
                errorStyle={{height: 0, margin: 0}}
                placeholder="92146066"
                label="Número de identidad"
                inputStyle= { {
                    color: "black",
                    fontSize: 18
                } }
                labelStyle= { {
                    color: "black",
                    fontSize: 14,
                    marginBottom: 5
                } }
                inputContainerStyle= { {
                    alignSelf: "center",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                } }
                value={ dni }
                onChangeText = { setDni } 
            />
            <Input
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                placeholder="johndoe@gmail.com"
                errorStyle={{height: 0, margin: 0}}
                label="Email"
                inputStyle= { {
                    color: "black",
                    fontSize: 18
                } }
                labelStyle= { {
                    color: "black",
                    fontSize: 14,
                    marginBottom: 5
                } }
                inputContainerStyle= { {
                    alignSelf: "center",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                } }
                value={ email }
                onChangeText = { setEmail } 
            />
                <View style={ {
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start', 
                        marginBottom: 10
                }          
                }>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>Celular</Text>
                    <View style={ {
                    flexDirection: 'row',
                    flex: 1,
                }          
                }>
                    <TextInput
                        editable={false}
                        style={
                            {
                                color: "black",
                                fontSize: 18 ,
                                borderWidth: 1,
                                borderRadius: 15,  
                                backgroundColor: '#e3e3e3',
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
                        label="Celular"
                        value={ phoneCode }
                    />
                     <TextInput
                        editable={false}
                        style={
                            {
                                flex: 1,
                                flexGrow: 3,
                                color: "black",
                                fontSize: 18 ,
                                borderWidth: 1,
                                borderRadius: 15, 
                                backgroundColor: '#e3e3e3', 
                                borderColor: 'rgba(0,0,0,0.5)',
                                height: 42,
                                paddingLeft: 10,
                                paddingRight: 10
                            }
                        }
                        value={ phoneNumber }
                    />


                    </View>
                </View>
                <Input
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                    editable={true}
                    errorStyle={{height: 0, margin: 0}}
                    placeholder=""
                    label="Fecha de Nacimiento"
                    inputStyle= { {
                        color: "black",
                        fontSize: 18
                    } }
                    labelStyle= { {
                        color: "black",
                        fontSize: 14,
                        marginBottom: 5
                    } }
                    inputContainerStyle= { {
                        alignSelf: "center",
                        borderWidth: 1,
                        borderRadius: 15,
                        paddingLeft: 10,
                        paddingRight: 10
                    } }
                    value={ birthdate }
                    onChangeText={ setBirthdate }
                />

            </View>
            <Button 
                    raised
                    title="Enviar"
                    onPress={ onPressButton }
                    containerStyle= {  {
                        width: "25%",
                        alignSelf: "center",
                        flexBasis: "auto"
                    } }
                    buttonStyle= {  {
                        backgroundColor: "rgba(249,22,116,1)"
                    } }
                />
        </View>
    );
    
};

export default ProfileTemplate;