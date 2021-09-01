import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import {BusinessRegister, Promotion, HelpCenter, Signup, Home, HomeFilter, Order, Splash, Category, Store, Product, Profile, ShoppingCart } from '_pages';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDrawerContent } from '_organisms';
import { AppContext, useAppContext, useSplashScreen } from '_utils';
import { OrderService } from '_services';

const Drawer = createDrawerNavigator();

const App = () => { 

    const [isStepperComplete, setIsStepperComplete] = useState(false);
    const [appContext, state, dispatch] = useAppContext(setIsStepperComplete);
    const [isReady] = useSplashScreen(setIsStepperComplete, dispatch);

    const [isListen, setIsListen] = useState(true);

    useEffect(() => {
      if(state.profile) {
        OrderService
        .getItems({
            p: 1,
            rpp: 200,
            query: null,
            params: {
                status: 'inactivo'
            }
        })
        .catch(error => {
            console.log('Error:', error);
        })
        .then(response => {
              if(response && response.data) {
                  appContext.setOldOrders(response.data);
              }
        });
      }
    }, [state.orders, state.profile]);

    useEffect(() => {
      if(state.profile && state.checkForNewOrders) {
        OrderService
        .getItems({
            p: 1,
            rpp: 200,
            query: null,
            params: {
                status: 'activo'
            }
        })
        .catch(error => {
            console.log('Error:', error);
            setIsListen(false);
            appContext.newOrdersHasBeenChecked();
        })
        .then(response => {
              if(response && response.data) {
                  appContext.setOrders(response.data);
                  appContext.newOrdersHasBeenChecked();
              }
        });
      }

    }, [state.profile, state.checkForNewOrders]);


    useEffect(() => {
      let timeout = null;

      if(isListen) {
        timeout = setTimeout(() => {
          if(state.profile) {
            OrderService
            .getItems({
                p: 1,
                rpp: 200,
                query: null,
                params: {
                    status: 'activo'
                }
            })
            .catch(error => {
                console.log('Error:', error);
                setIsListen(false);
  
            })
            .then(response => {
                  if(response && response.data) {
                      appContext.setOrders(response.data);
                  }
                  setIsListen(false);
            });
          } else {
            setIsListen(false);
          }

        }, 15000);
      }

      return () => {
        setIsListen(true);
        if(timeout) {
          clearTimeout(timeout);
        }
      }
    }, [isListen]);

      if(!isReady) {
          return (
              <Splash />
          );
      }
      
      return (
     <AppContext.Provider value={appContext}>
      { isStepperComplete ? (
            <NavigationContainer>
                <Drawer.Navigator 
                    drawerStyle={{
                      width: '90%'
                    }}
                    screenOptions={{
                      swipeEnabled: false
                    }}
                    initialRouteName="Inicio" 
                    drawerContent={(props) => <CustomDrawerContent {...props} profile={state.profile}/>}
                >
                    <Drawer.Screen name="Inicio" component={Home} />
                    <Drawer.Screen name="Historial de pedidos" component={Order} />
                    <Drawer.Screen name="Perfil" component={Profile} />
                    <Drawer.Screen name="¿Quieres vender con nosotros?"  component={BusinessRegister} />
                    <Drawer.Screen name="Centro de ayudas"  component={HelpCenter} />  
                    <Drawer.Screen name="Category"  component={Category} />
                    <Drawer.Screen name="Store"  component={Store} />
                    <Drawer.Screen name="Product"  component={Product} />
                    <Drawer.Screen name="ShoppingCart"  component={ShoppingCart} />
                    <Drawer.Screen name="Promotion" component={Promotion} />
                    <Drawer.Screen name="HomeFilter" component={HomeFilter} />

                </Drawer.Navigator>
            </NavigationContainer>
        ):(
            <Signup
                onComplete={setIsStepperComplete}
            />
        )}
      </AppContext.Provider>
      );

};

registerRootComponent(App);
