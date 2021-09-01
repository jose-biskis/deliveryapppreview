import React, {useState, useEffect, useContext} from 'react';
import { ShoppingCartTemplate } from '_templates';
import { DeliveryTimeService , CouponService, OrderService } from '_services';
import { Alert, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { AppContext, getProductsSubtotals } from '_utils';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const sortIntervals = (intervals) => {
    console.log(intervals);
    return intervals.sort((a, b) => a.interval.replace(/[^0-9]/g, "") - b.interval.replace(/[^0-9]/g, ""));   
}

const ShoppingCart = ({ navigation }) => {
    const { shoppingCart, addresses, checkForNewOrders, cleanShoppingCart } = useContext(AppContext);
    const [isSuscribed, setIsSuscribed] = useState(false);
    const [deliveryTimeTypes, setDeliveryTimeTypes] = useState(null);
    const [dates, setDates] = useState(null);
    const [intervals, setIntervals] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: '0',
            name: ''
        },
        {
            id: '1',
            name: 'Efectivo'
        },
        {
            id: '2',
            name: 'Datafono'
        }
    ]);

    

    const [deliveryTimeType, setDeliveryTimeType] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [date, setDate] = useState(null);
    const [dateInterval, setDateInterval] = useState(null);
    const [coupon, setCoupon] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loadDeliveryTypes, setLoadDeliveryTypes] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState(null);


    useEffect(() => {
        let interval = null;
        if(isCompleted) {
            interval = setTimeout(() => {
                navigation.navigate('Inicio');
            }, 3000);
            
        }

        return () => {
            if(interval) {
                clearTimeout(interval);
            }
        };
    }, [isCompleted])
    useEffect(() => {
        setIsSuscribed(true);

        const unsubscribe = navigation
                                .addListener('blur', () => {
                                    setIsSuscribed(false);
                                    setIsCompleted(false);
                                    setCreatedOrderId(null);
                                    if(loadDeliveryTypes) {
                                        setLoadDeliveryTypes(false);
                                    }
                                });

        const unsubscribeFocus = navigation
                                .addListener('focus', () => {
                                    setIsSuscribed(true);
                                    setIsCompleted(false);
                                    setLoadDeliveryTypes(true);
                                });
    

        
        return () => {
            setIsSuscribed(false);
            unsubscribe();
            unsubscribeFocus();
        };
    }, [navigation]); 
    useEffect(() => {
        if(loadDeliveryTypes) {
            let params = {};

            params.getBy = 'tipoEntrega';
    
            DeliveryTimeService
            .getItems({
                p: 1,
                rpp: null,
                query: null,
                params
            })
            .catch(error => { 
                console.log('Error: Product', error); 
                setLoadDeliveryTypes(false); 
             })
            .then(response => {
                if(isSuscribed) {
                    if(response && response.data) {
                        setDeliveryTimeTypes([...[{deliveryTypeId:'0', name: ''}],...response.data]);
                    }
                }
                setLoadDeliveryTypes(false);
            });
        }
    }, [loadDeliveryTypes]);

    useEffect(() => {
        if(deliveryTimeType && deliveryTimeType.deliveryTypeId == 2) {
            let params = {};
            params.getBy = 'fecha';
    
            DeliveryTimeService
            .getItems({
                p: 1,
                rpp: null,
                query: null,
                params
            })
            .catch(error => { 
                console.log('Error: Product', error);  
             })
            .then(response => {
                if(isSuscribed) {
                    if(response && response.data) {
                        let todayDate = new Date();
                        let today = todayDate.getDay() + 1;

                        response.data.sort((a, b) => {
                            let aDiff = 0;
                            if(today > a.date) {
                                aDiff = (a.date + 7) - today;
                            } else if(today == a.date) {
                                aDiff = 7;
                            } else {
                                aDiff = (a.date - today);
                            }

                            let bDiff = 0;
                            if(today > b.date) {
                                bDiff = (b.date + 7) - today;
                            } else if(today == b.date) {
                                bDiff = 7;
                            } else {
                                bDiff = (b.date - today);
                            }

                            return aDiff - bDiff;
                        });

                        setDates([...[{date:'', month: '', day: ''}],...response.data]);
                    }
                }
                
            });
        }

    }, [deliveryTimeType]);

    useEffect(() => {
        if(date) {
            let params = {};

            params.getBy = 'intervalo';
            params.fecha = date.date;
            console.log(params);
            DeliveryTimeService
            .getItems({
                p: 1,
                rpp: null,
                query: null,
                params
            })
            .catch(error => { 
                console.log('Error: Product', error);  
             })
            .then(response => {
                if(isSuscribed) {
                    if(response && response.data) {

                        setIntervals([...[{id:'0', interval:''}], ...sortIntervals(response.data)]);
                    }
                }
                
            });
        }

    }, [date]);

    const showAlert = (title, message) => {
        Alert
        .alert(
            title,
            message,
            [
                {text: 'OK'}
            ],
            {
                cancelable: false
            }
        ) 
    }
    const showWarningAlert = (message) => {
        showAlert('Alerta', message);
    }
    const showErrorAlert = (message) => {
        showAlert('Error', message);
    }

    const onSave = () => {
        const currentAddress = addresses.filter(item => item.isSelected)[0];
        const { productsSubtotal } = getProductsSubtotals(coupon, shoppingCart.products, 3600);

        if(!currentAddress) {
            showWarningAlert('La dirección es requerida');
        } else if(!shoppingCart || !shoppingCart.products || shoppingCart.products < 1) {
            showWarningAlert('Al menos un producto es requerido');        
        } else if(!deliveryTimeType 
            || (deliveryTimeType.deliveryTypeId == '0') 
            || (deliveryTimeType.deliveryTypeId == 2 
                    && (!date || date.date == '0'
                    || !dateInterval || dateInterval.id == '0'))) {
            showWarningAlert('El tiempo de entrega es requerido');
        } else if(!paymentMethod || paymentMethod.id == '0') {
            showWarningAlert('El método de pago es requerido');         
        } else if(productsSubtotal < 20000) {
            showWarningAlert('El monto mínimo del pedido es de $20.000');
        } else {
            OrderService
            .post({
                products: shoppingCart.products,
                brief: '',
                deliveryTimeId: dateInterval && dateInterval.id,
                couponId: coupon && coupon.id,
                addressId: currentAddress.id,
                paymentMethodId: paymentMethod.id
            })
            .catch(error => { 
                console.log('Error: Coupon', error);  
                showErrorAlert('Se ha producido un problema creando el pedido');
             })
            .then(response => {
                if(isSuscribed) {
                    if(response.error) {
                        showErrorAlert(response.error);
                    } else {
                        setCreatedOrderId(response.id);
                        checkForNewOrders();                      
                        setDeliveryTimeTypes(null);
                        setDates(null);
                        setIntervals(null);
                        setDeliveryTimeType(null);
                        setPaymentMethod(null);
                        setDate(null);
                        setDateInterval(null);
                        setCoupon(null);       
                        setLoadDeliveryTypes(false);
                        setIsCompleted(true);
                        cleanShoppingCart();
                    }
                }
                
            });
        }
    };
    const onSetDeliveryTimeType = (value) => {
        setDeliveryTimeType(value);
    }
    const onSetDate = (value) => {
        setDate(value);
    }
    const onSetDateInterval = (value) => {
        setDateInterval(value);
    };
    const onSetPaymentMethod = (value) => {
        setPaymentMethod(value);
    };
    const onSetCoupon = (value) => {
        if(value) {
            let params = {};
            // Get distinct stores ids
            // And join by comma
            params.tiendas =  shoppingCart.products
                                    .map(item => item.storeId)
                                    .reduce((carry, current) => {
                                            if(carry.indexOf(current) < 0) { 
                                                carry.push(current)  
                                            }
                                            return carry;
                                    }, []).join(',');
    
            CouponService
            .getItem({
                pathParams: {
                    path: '{code}',
                    items: {
                        code: value
                    }
                },
                params
            })
            .catch(error => { 
                console.log('Error: Coupon', error);  
                showErrorAlert('No se ha podido validar el cupón');
             })
            .then(response => {
    
                if(isSuscribed) {
                    if(response.error) {
                        showErrorAlert(response.error);
                    } else {
                        setCoupon(response);
                    }
                }
                
            });
        } else {
            setCoupon(null);
        }

    };

    useEffect(() => {
        if(isSuscribed && !isCompleted) {
            if(shoppingCart && shoppingCart.products &&  shoppingCart.products.length < 1) {
                navigation.goBack();
            }
        }

    }, [shoppingCart]);

    const onCleanShoppingCart = () => {
        cleanShoppingCart();
    };

    if(isCompleted) {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#ECF0F1'
              }}> 
                <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
                <LinearGradient
                colors={['rgba(255,222,72,1)', 'rgba(249,22,116,1)']}
                style={{ padding: 15, alignItems: 'center', flex:1, justifyContent: 'center'}}>
                    <View 
                        style={{
                            height: 120,
                            aspectRatio: 1,
                            borderRadius: 100,
                            borderColor:'#ffffff',
                            borderWidth: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Icon
                        name="check"
                        size={80}
                        color="#ffffff"
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 40,
                            color: '#ffffff',
                            textAlign:'center'
                        }}
                    >
                        Su pedido ha sido procesado
                    </Text>
                    {
                    createdOrderId &&
                    <Text
                        style={{
                            fontSize: 40,
                            color: '#ffffff',
                            textAlign:'center'
                        }}
                    >
                        Código: {createdOrderId}
                    </Text>
                    }
                </LinearGradient> 
            </SafeAreaView>
        );
    } else {
        return (      
            <ShoppingCartTemplate
                onNavigateBack={() => {
                    navigation.goBack();
                }}
                hasBack={true}
                onCleanShoppingCart={onCleanShoppingCart}
                onSetCoupon={onSetCoupon}
                onSetDateInterval={onSetDateInterval}
                onSetDeliveryTimeType={onSetDeliveryTimeType}
                onSetPaymentMethod={onSetPaymentMethod}
                onSetDate={onSetDate}
                intervals={intervals}
                dates={dates}
                deliveryTimeTypes={deliveryTimeTypes}
                onSave={onSave}
                products={shoppingCart ? shoppingCart.products: []} 
                coupon={coupon}   
                dateInterval={dateInterval} 
                date={date} 
                deliveryTimeType={deliveryTimeType}  
                paymentMethod={paymentMethod}
                paymentMethods={paymentMethods}  
            />
        );
    }
}

export default ShoppingCart;
