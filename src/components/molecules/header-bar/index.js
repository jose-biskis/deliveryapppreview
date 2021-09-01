import React, {useState, useContext, useEffect} from 'react';
import {  TouchableOpacity, View, Text, Alert, Image} from 'react-native';
import {Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext, useSignin } from '_utils';
import { NavigationContext } from '@react-navigation/native';
import { AddressService } from '_services';
import { default as AddressModal } from '../../organisms/address-modal/index';
import { default as SignupModal } from '../../organisms/signup-modal/index';
import { default as TermsModal} from '../../organisms/terms-modal/index';

const shoppingCartIcon = require("_assets/shoppingCart.png");
const profileIcon = require("_assets/profile.png");

// TODO: split component in small pieces
const HeaderBar = (props) => {
    const { addresses, setAddresses, shoppingCart, profile } = useContext(AppContext);
    const navigation = useContext(NavigationContext);
    const [ isSubscribed, setIsSubscribed] = useState(true);
    const [ isItemSubscribed, setIsItemSubscribed] = useState(true);
    const [ currentAddress, setCurrentAddress ] = useState(null); 
    const [ signupModalVisible, setSignupModalVisible] = useState(false);
    const [ isAddressModalVisible, setIsAddressModalVisible ] = useState(false);
     
    const onSignupModalClose = () => {
        setSignupModalVisible(false);    
    }

    const onAddAddress = (data) => {
        AddressService
        .post(data)
        .catch(error => {
            console.log('Error:', error);
        })
        .then(response => {
            if(isSubscribed) {
                if(response) {
                    setAddresses([...addresses, ...[response]]);
                }
            }
        });
    }

    const onDeleteAddress = (data) => {                     
        Alert.alert(
            'Alerta',
            `Desea eliminar la dirección: ${data.address}`,
            [
                { 
                    text: "Sí",
                    onPress:() => {
                        AddressService
                        .remove(data.id)
                        .catch(error => {
                            console.log('Error:', error);
                        })
                        .then(response => {
                            if(isSubscribed) {
                                if(response && response.length > 0 && response[0] && response[0].error) {
                                    Alert.alert(
                                        'Alerta',
                                        response[0].error,
                                        [
                                            {
                                                text: ''
                                            }
                                        ],
                                        {
                                            cancelable: false
                                        }
                                    );

                                } else {
                                    setAddresses(addresses.filter((address) => {
                                        return address.id != data.id;
                                    }));                                  
                                }
                            }
                        });
                    }    
                },   
                { text: "No" }          
       
            ],
            { cancelable: false }
        );
                
    }

    const onSelectAddress = (data) => {
        //console.log(data);
        const newAddresses = addresses.map((address, index) => {
            address.isSelected = data.id == address.id;
            return address;
        }); 
        
        //console.log(newAddresses);
        setAddresses(newAddresses);
    }

    const onOpenCart = () => {
        if(profile) {
            if(currentAddress) {
                if(shoppingCart && shoppingCart.products && shoppingCart.products.length > 0) {
                    navigation.navigate('ShoppingCart');
                } else {
                    Alert.alert(
                        'Alerta',
                        'Debes tener al menos un producto en el carrito',
                        [
                            { text: "OK" }          
                        ],
                        { cancelable: false }
                    )      
                }
            } else {
                Alert.alert(
                    'Alerta',
                    'Debes tener al menos una dirección',
                    [
                        { text: "OK" }          
                    ],
                    { cancelable: false }
                )
            }
        } else {
            if(shoppingCart && shoppingCart.products && shoppingCart.products.length > 0) {
                setSignupModalVisible(true);
            } else {
                Alert.alert(
                    'Alerta',
                    'Debes tener al menos un producto en el carrito',
                    [
                        { text: "OK" }          
                    ],
                    { cancelable: false }
                )      
            }          
        }
    }

    useEffect(() => {
        setIsSubscribed(true);
        if(isSubscribed && isItemSubscribed && profile) {
            AddressService
            .getItems({
                p: 1,
                rpp: null,
                query: null,
                params: null
            })
            .catch(error => {
                console.log('Error:', error);
                setIsItemSubscribed(false);
            })
            .then(response => {
                if(isSubscribed) {
                    if(response && response.data) {
                        let newAddresses = null;

                        if(addresses && addresses.length > 0) {
                            let filterAddresses = response.data.filter((address) => {
                                return !addresses.some(item => address.id == item.id);
                            });
                            
                            newAddresses = [...addresses, ...filterAddresses];
                        } else {
                            newAddresses = response.data.map((address, index) => {
                                address.isSelected = index == 0;
                                return address;
                            })
                        }
                        setAddresses(newAddresses);
                    }
                }
                setIsItemSubscribed(false);
            });
        }   

        return () => {
            setIsSubscribed(false);   
        }
    }, [profile]);

    useEffect(() => {
       if(addresses) {
        setCurrentAddress(addresses.filter(address => address.isSelected)[0]);
       }
    }, [addresses])

    return (
            <View
                style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 50,
                    marginTop: 10,
                }}
            >
                { props.hasBack &&
                <View style={{
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '100%',
                    width: '20%'
                }}>
                    <Button
                        icon={
                            <Icon
                            name="arrow-left"
                            size={20}
                            color="rgba(249,22,116,1)"
                            />
                        }
                        
                        onPress={ props.onNavigateBack }
                        containerStyle= {  {
                            width: 50,
                            alignSelf: "center",
                            flexBasis: "auto"
                        } }
                        buttonStyle= {  {
                            backgroundColor: "transparent"
                        } }        
                    />
                </View>
                }
                {
                    profile && !props.hasBack && 
                    <View style={{
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '100%',
                        width: '20%'
                    }}>
                        <Button
                            icon={
                                <Image 
                                    source={profileIcon}
                                    style={{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                            }
                            
                            onPress={ () => navigation.toggleDrawer() }
                            containerStyle= {  {
                                width: 50,
                                alignSelf: "center",
                                flexBasis: "auto"
                            } }
                            buttonStyle= {  {
                                backgroundColor: "transparent"
                            } }        
                        />
                    </View>
                }
                {
                    profile && addresses &&
                    <View style={{
                        justifyContent: 'center',
                        height: '100%',
                        width: '60%',
                        overflow: 'hidden'
                    }}>
                        <AddressSelector 
                        currentAddress={currentAddress} 
                        addresses={addresses}
                        onSelectAddress={onSelectAddress}
                        onDeleteAddress={onDeleteAddress}
                        onAddAddress={onAddAddress}
                        isAddressModalVisible={isAddressModalVisible}
                        setIsAddressModalVisible={setIsAddressModalVisible}
                        />
                    </View>
                }
                {
                    !profile &&
                    <>
                        <SignupSection
                            onSignupModalClose={onSignupModalClose}
                            signupModalVisible={signupModalVisible}
                            setSignupModalVisible={setSignupModalVisible}
                            setIsAddressModalVisible={setIsAddressModalVisible}
                        />
                    </>
                }
                {
                    profile && !addresses && props.title &&
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width:'60%',
                        overflow: 'hidden'
                    }}>
                        <View style={{borderWidth:0, alignSelf:'center'}}>
                            <Text 
                                numberOfLines={1} 
                                style={{fontSize: 18, width:'100%', alignSelf: 'center' }}
                            >
                                {props.title}
                            </Text>
                            <Text numberOfLines={1} style={{alignSelf: 'center', fontSize: 10, width:'100%', alignItems: 'center',justifyContent: 'center' }}>{props.subtitle}</Text>
                        </View>

                    </View>
                }
                {
                    !profile && !addresses && !props.title && 
                    <View
                        style={{
                            width: '60%'
                        }}
                    >
                    </View>     
                }
                {
                    props.hasShoppingCart &&
                    <View style={{
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '100%',
                        width: '20%',
                        paddingRight: 15
                    }}>
                        <Button
                            onPress={onOpenCart}
                            icon={
                                <Image 
                                    source={shoppingCartIcon}
                                    style={{
                                        height: 25,
                                        width: 37
                                    }}
                                />
                            }
                            containerStyle= {  {
                                width: 50,
                                alignSelf: "flex-end",
                                flexBasis: "auto"
                            } }
                            buttonStyle= {  {
                                backgroundColor: "transparent"
                            } }        
                        />
                        {
                            (shoppingCart && shoppingCart.products && shoppingCart.products.length > 0) &&
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'rgba(249,22,116,1)',
                                    height: 15,
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    top: 5,
                                    right: 10
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 10,
                                    fontWeight: 'bold'
                                }}>
                                    {shoppingCart.products.length}
                                </Text>
                            </View>
                        }
                    </View>
                }
                {
                    !props.hasShoppingCart &&
                    <View
                        style={{
                            width: '20%'
                        }}
                    >

                    </View>
                }
            </View>
    );
};

const SignupSection = ({signupModalVisible, setSignupModalVisible, onSignupModalClose, setIsAddressModalVisible}) => {
    const onStepperComplete = (isStepperComplete) => {
        setSignupModalVisible(!isComplete);
        setIsAddressModalVisible(true);
    }
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [step, setNextStep, isComplete, upStepCallback] = useSignin(onStepperComplete, setIsTermsModalVisible);

    const onTermsModalClose = () => {
        setIsTermsModalVisible(!modalVisible);    
    }

    const onContinue = () => {
        upStepCallback();
        setIsTermsModalVisible(false);
    }

    const onCancel = () => {
        Alert
            .alert(
                "Alerta",
                "¿Desea cerrar la modal?",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setIsTermsModalVisible(false);
                        }
                    },
                    {
                        text: "Cancelar"
                    }
                ],
                {
                    cancelable: false
                }
            )   
    }

    return (
        <>
            <SignupModal 
                isModalVisible={signupModalVisible}
                step={step} 
                setNextStep={setNextStep}
                onModalClose={onSignupModalClose}
            />           
            <TermsModal 
                isModalVisible={isTermsModalVisible}
                onModalClose={onTermsModalClose}
                onContinue={onContinue}
                onCancel={onCancel}
                isInternalSignup={true}
            />
        </>
    );
    
}


//TODO: make it like a modal
const AddressSelector = (props) => {
    const isModalVisible = props.isAddressModalVisible;
    const setIsModalVisible = props.setIsAddressModalVisible;

    const onModalClose = () => {
        setIsModalVisible(false); 
    }
    return (
        <View>
            <TouchableOpacity
            onPress={() => {
               setIsModalVisible(true);
            }}
            style={{borderWidth:0, alignSelf:'center'}}>
                <Text numberOfLines={1} style={{fontSize: 18, width:'100%', alignSelf: 'center' }}>{props.currentAddress && props.currentAddress.address}</Text>
                <Text numberOfLines={1} style={{alignSelf: 'center', fontSize: 10, width:'100%', alignItems: 'center',justifyContent: 'center' }}>cambiar dirección</Text>
            </TouchableOpacity>
            <AddressModal 
                addresses={props.addresses}
                onModalClose={onModalClose}
                isModalVisible={isModalVisible}
                onDeleteAddress={props.onDeleteAddress}
                onSelectAddress={props.onSelectAddress}
                onAddAddress={props.onAddAddress}
            /> 
        </View>
    );
};

export default HeaderBar