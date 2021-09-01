import React, {useState, useEffect, useContext} from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { View, Text, Linking, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppContext } from '_utils';
import { VerticalSeparator } from '_atoms';


const profileImage = require("_assets/profile.png");
const profileIconImage = require("_assets/menuProfileIcon.png");
const orderIconImage = require("_assets/menuOrderIcon.png");
const closeIconImage = require("_assets/menuCloseIcon.png");
const businessRegisterIconImage = require("_assets/menuBusinessRegisterIcon.png");
const helpCenterIconImage = require("_assets/menuHelpCenterIcon.png");

const CustomDrawerContent = (props) => {
    const navigation = props.navigation;
    const { signOut } = useContext(AppContext);

    const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            routeName => routeName !== 'ShoppingCart' && routeName !== 'Category' && routeName !== 'Promotion' && routeName !== 'Store' && routeName !== 'Product' && routeName !== 'HomeFilter' 
          ),
          routes: props.state.routes.filter(
            route => route.name !== 'ShoppingCart' && route.name !== 'Category' && route.name !== 'Promotion' && route.name !== 'Store' && route.name !== 'Product' && route.name !== 'HomeFilter'
          ),
        },
      };

    return (
          <View style={{height: '100%', flex:1, paddingTop: 30, paddingBottom: 30}}>
          {
            props.profile && 
            <>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
                <View 
                  style={{
                    height: 100,
                    flex: 1,
                    justifyContent: 'center',
                    //alignItems: 'center'
                  }}
                >
                    <Text style={{fontSize: 22}}>Hola </Text>
                    <Text style={{fontSize: 32, fontWeight: 'bold'}}>{ props.profile && props.profile.name } </Text>
                    </View>
                <View 
                    style={{
                        justifyContent: 'center',
                    }}>
                    <View style={{
                                height: 70,
                                width: 70,
                                borderRadius: 100,
                                backgroundColor: '#FFFFFF',
                                overflow: 'hidden',
                                elevation: 10,
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
            
              <ScrollView style={{paddingTop: 0}}>

              <View style={{
                flex:1
              }}>
                <CustomDrawerItem 
                  iconUrl={profileIconImage}
                  iconHeight={27}
                  iconWidth={27}
                  label="Perfil"
                  onPress={() => {
                    navigation.navigate('Perfil');
                  }}
                />
                <VerticalSeparator 
                  style={{width: '90%', alignSelf:'center'}}
                  opacity={0.2}
                />
                <CustomDrawerItem 
                  iconUrl={orderIconImage}
                  iconHeight={30}
                  iconWidth={27}
                  label="Historial de pedidos"
                  onPress={() => {
                    navigation.navigate('Historial de pedidos');
                  }}
                />
                <VerticalSeparator 
                  style={{width: '90%', alignSelf:'center'}}
                  opacity={0.2}
                />
                <CustomDrawerItem 
                  iconUrl={businessRegisterIconImage}
                  iconHeight={21}
                  iconWidth={33}
                  label="¿Quieres vender con nosotros?"
                  onPress={() => {
                    navigation.navigate('¿Quieres vender con nosotros?');
                  }}
                />
                <VerticalSeparator 
                  style={{width: '90%', alignSelf:'center'}}
                  opacity={0.2}
                />
                <CustomDrawerItem 
                  iconUrl={helpCenterIconImage}
                  iconHeight={26}
                  iconWidth={26}
                  label="Centro de ayudas"
                  onPress={() => {
                    navigation.navigate('Centro de ayudas');
                  }}
                />
                <VerticalSeparator 
                  style={{width: '90%', alignSelf:'center'}}
                  opacity={0.2}
                />
                <CustomDrawerItem 
                  iconUrl={closeIconImage}
                  iconHeight={27}
                  iconWidth={30}
                  label="Cerrar sesión"
                  onPress={() => {
                    Alert.alert(
                      "Alerta",
                      "¿Desea cerrar la sesión?",
                      [
                        { 
                          text: "Sí", 
                          onPress: () => {
                            signOut();
                          }
                        },
                        {
                          text: 'No', onPress: () => true
                        }
                      ],
                      { cancelable: false }
                  );
                  }}
                />
                <VerticalSeparator 
                  style={{width: '90%', alignSelf:'center'}}
                  opacity={0.2}
                />
              </View>

            </ScrollView>
              <View style={{flex:1, justifyContent:'flex-end'}}>
                    <Text style={{textAlign: 'center'}}>
                      Imágenes suministradas por{"\n"}
                      <Text style={{color: 'rgba(249,22,116,1)'}} onPress={() => Linking.openURL('https://freepik.es')}>https://freepik.es</Text>
                    </Text>
              </View>
            </>
          }
          </View>
    );
};

const CustomDrawerItem = ({iconUrl, label, onPress, iconHeight, iconWidth}) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 5,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
      }} 
      onPress={onPress} 
    >
        <CustomDrawerItemLabel 
          iconUrl={iconUrl}
          label={label}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
          scale={0.6}
        />
    </TouchableOpacity>
  );
};

const CustomDrawerItemLabel = ({ iconUrl, iconHeight, iconWidth, scale, label}) => {


  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15,
        width: '100%',
        height: '100%'
      }}
    >
          <View 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: iconHeight * scale,
                width: iconWidth * scale,
                marginRight: 10
            }}
          >
            <Image
                
                style={{
                  height: iconHeight * scale,
                  width: iconWidth * scale
                }}
                source={iconUrl}
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>{label}</Text>
          </View>
    </View>
  );
};

export default CustomDrawerContent;