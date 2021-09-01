import React, { useState } from 'react';
import { Modal, View, Text, TouchableHighlight, Alert, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { default as AddressList } from '../address-list/index';
import styles from './style';

const AddressModal = ({isModalVisible, onModalClose, addresses, onAddAddress, onDeleteAddress, onSelectAddress }) => {
    const [addressInputText, setAddressInputText] = useState("");
    const [aliasInputText, setAliasInputText] = useState("");
    const [infoInputText, setInfoInputText] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const onAddNewAddress = () => {
        if(!isPosting) {
            if(addressInputText && aliasInputText) {
                onAddAddress({
                    address: addressInputText,
                    name: aliasInputText,
                    info: infoInputText
                });
                setAddressInputText("");
                setAliasInputText("");
                setInfoInputText("");
                setIsPosting(false);
            } else {
                Alert.alert(
                    "Alerta",
                    "Los campos son requeridos",
                    [
                        {text: 'OK'}
                    ],
                    {
                        cancelable: false
                    }
                );
            }
        }

    }

    return (
        <Modal      
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        {   addresses &&
            <View style={styles.centeredView}>
                <TouchableWithoutFeedback onPress={onModalClose}>
                <View  
                    style={{
                        position: 'absolute', 
                        backgroundColor: 'transparent', 
                        height: '100%', 
                        width:'100%'
                    }}
                >           
                </View>
                </TouchableWithoutFeedback>
                <Text style={{color: '#ffffff'}} onPress={onModalClose}>Presione acá para cerrar</Text>
                <View style={styles.modalView}>
                    <View
                        style={{
                            flexDirection: 'column',
                            width: '100%',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                    <Input
                        label="Dirección"
                        rightIconContainerStyle= { styles.rightIconContainerStyle }
                        inputStyle = { styles.fontStyle }
                        containerStyle={ styles.containerStyle }
                        inputContainerStyle= { styles.inputContainerStyle }
                        value={addressInputText}
                        onChangeText={setAddressInputText}
                        errorStyle={{
                            height: 0
                        }}
                    />
                    <Input
                        label="Alias"
                        placeholder="Casa, oficina ..."
                        rightIconContainerStyle= { styles.rightIconContainerStyle }
                        inputStyle = { styles.fontStyle }
                        containerStyle={ styles.containerStyle }
                        inputContainerStyle= { styles.inputContainerStyle }
                        value={aliasInputText}
                        onChangeText={setAliasInputText}
                        errorStyle={{
                            height: 0
                        }}
                    />
                    <Input
                        label="Info adicional"
                        rightIconContainerStyle= { styles.rightIconContainerStyle }
                        inputStyle = { styles.fontStyle }
                        containerStyle={ styles.containerStyle }
                        inputContainerStyle= { styles.inputContainerStyle }
                        value={infoInputText}
                        onChangeText={setInfoInputText}
                        errorStyle={{
                            height: 0
                        }}
                    />
                    <Button
                        icon={
                            <Icon
                                name='plus'
                                size={20}
                                color='#ffffff'
                            />
                        }
                        
                        onPress={onAddNewAddress}
                        containerStyle= {  {
                            width: '20%',
                            height: 30,
                        } }
                        buttonStyle= {  {
                            backgroundColor: "rgba(249,22,116,1)"
                        } }        
                    />
                    </View>
                    <View style={{
                        width: '100%',
                        height: 10,
                        backgroundColor: '#F3F3F3'
                    }}></View>
                    <View style={{width: '100%', height: '100%', paddingTop: 10, flex:1}}>
                        <AddressList
                            items={addresses}
                            onDeleteAddress={onDeleteAddress}
                            onSelectAddress={onSelectAddress}
                        />
                    </View>
                </View>
                
                
            </View>
        }
      </Modal>
      );
}




export default AddressModal;