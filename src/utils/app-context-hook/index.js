import React, { useReducer, useMemo } from 'react';
import { LoginService } from '_services';
import AsyncStorage from '@react-native-community/async-storage';

const useAppContext = (setIsStepperComplete) => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'CHECK_FOR_NEW_ORDERS':
              return {
                ...prevState,
                checkForNewOrders: action.checkForNewOrders
              }
            case 'SET_ORDERS':
              let newState = {};

              if(action.orders) {
                newState.orders = action.orders;
              }

              if(action.oldOrders) {
                newState.oldOrders = action.oldOrders;
              }

              return {
                ...prevState,
                ...newState
              };
            case 'SET_SHOPPING_CART_PRODUCTS':
              return {
                ...prevState,
                shoppingCart: {
                  products: action.products
                },
              };
            case 'SET_PROFILE':
              return {
                ...prevState,
                profile: action.profile,
              };
            case 'SET_ADDRESSES':
              return {
                ...prevState,
                addresses: action.addresses,
              };
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
                profile: null,
                addresses: null,
                checkForNewOrders: true,
                orders: [],
                oldOrders: [],
                shoppingCart: {
                  products: []
                }
              };
          }
        },
        {
          checkForNewOrders: true,
          isLoading: true,
          isSignout: false,
          userToken: null,
          profile: null,
          addresses: null,
          orders: [],
          oldOrders: [],
          shoppingCart: {
            products: []
          }        
        }
      );
    
    const appContext = useMemo(
      () => ({
        profile: state.profile,
        orders: state.orders,
        oldOrders: state.oldOrders,
        shoppingCart: state.shoppingCart,
        addresses: state.addresses,
        newOrdersHasBeenChecked: async () => {
          dispatch({type: 'CHECK_FOR_NEW_ORDERS', checkForNewOrders: false});        
        },
        checkForNewOrders: async () => {
          dispatch({type: 'CHECK_FOR_NEW_ORDERS', checkForNewOrders: true});        
        },
        setOrders: async (data) => {

          let toOldOrders = [];
          let toOrders = [];
          let orders = [...state.orders];
          let oldOrders = [...state.oldOrders];

          if(orders && orders.length > 0) {
            orders.forEach((order) => {
              const filteredIncomingOrder = data.filter(item => item.id == order.id)[0];

              if(filteredIncomingOrder) {
                if(filteredIncomingOrder.statusId != order.statusId) {
                  if(filteredIncomingOrder.statusId == 5) {
                    const filteredIncomingOrderIsInOldOrders = oldOrders.filter(item => item.id == filteredIncomingOrder.id)[0];

                    if(!filteredIncomingOrderIsInOldOrders) {
                      toOldOrders.push(filteredIncomingOrder);
                    }              
                  } else {
                    toOrders.push(filteredIncomingOrder);
                  }
                } else {
                  toOrders.push(order);                                  
                }                
              } 
            });

            data.forEach((order) => {
              const isIncluded = toOrders.filter(item => item.id == order.id)[0];

              if(!isIncluded) {
                toOrders.push(order);
              }
            });

          } else {
            if(data && data.length > 0) {
              toOrders = [...data];  
            } else {
              toOrders = [...orders]; 
            }
          }

          dispatch({type: 'SET_ORDERS', orders: toOrders, oldOrders: [...oldOrders,...toOldOrders]});        
        },
        setOldOrders: async (data) => {
          let toOldOrders = [];
          let oldOrders = [...state.oldOrders];

          data.forEach((oldOrder) => {
            const filteredOldOrder = oldOrders.filter(item => item.id == oldOrder.id)[0];

            if(!filteredOldOrder) {
              toOldOrders.push(oldOrder);
            }
          });     

          dispatch({type: 'SET_ORDERS', oldOrders: [...oldOrders,...toOldOrders]});       
        },
        addShoppingCartProduct: async (data) => {
          // console.log(data);
          let newProducts = [];

          if(state.shoppingCart && state.shoppingCart.products) {
            newProducts = [...state.shoppingCart.products];

            // TODO: change filter(...)[0] for some(...)
            const isInShoppingCart = newProducts.filter(product => product.id == data.id)[0];

            if(isInShoppingCart) {
              // TODO: use findIndex instead map
              newProducts = newProducts.map((product) => {
                  if(product.id == data.id) {
                    product.quantity = data.quantity
                  }
                  return product;
              });
            } else {
              newProducts.push(data);
            }

          } else {
            newProducts = [data];
          }

          dispatch({type: 'SET_SHOPPING_CART_PRODUCTS', products: newProducts});
        },
        removeShoppingCartProduct: async (data) => {
          let newProducts = [];

          if(state.shoppingCart && state.shoppingCart.products) {
            newProducts = [...state.shoppingCart.products];

            // TODO: change filter(...)[0] for some(...)
            const isInShoppingCart = newProducts.filter(product => product.id == data.id)[0];

            if(isInShoppingCart) {
              if(data.quantity == 0) {
                newProducts = newProducts.filter((product) => {
                    return product.id != data.id;
                });
              } else {
                // TODO: use findIndex instead map
                newProducts = newProducts.map((product) => {
                    if(product.id == data.id) {
                      product.quantity = data.quantity
                    }
                    return product;
                });
              }
            }
          }

          dispatch({type: 'SET_SHOPPING_CART_PRODUCTS', products: newProducts});
        },
        cleanShoppingCart: async () => {
          dispatch({type: 'SET_SHOPPING_CART_PRODUCTS', products: []});
        },
        setAddresses: async data => {

          dispatch({type: 'SET_ADDRESSES', addresses: data});
        },
        setProfile: async data => {
          //   console.log(data);
          dispatch({type: 'SET_PROFILE', profile: data});
        },
        signIn: async data => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () =>  { 
            LoginService
              .logout()
              .catch((resul) => {
                AsyncStorage
                  .removeItem('@UserData')
                  .then(() => {                
                    setIsStepperComplete(false);
                    dispatch({ type: 'SIGN_OUT' });
                  });
              })
              .then((result) => {
                  AsyncStorage
                    .removeItem('@UserData')
                    .then(() => {                
                      setIsStepperComplete(false);
                      dispatch({ type: 'SIGN_OUT' });
                    });
              });
        },
        signUp: async data => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      [state.addresses, state.shoppingCart.products, state.orders, state.oldOrders, state.profile]
    );




    return [appContext, state, dispatch];
}

export default useAppContext;