import React, {useState, useEffect, useContext} from 'react';
import { KeyboardAvoidingView ,SafeAreaView, Alert, FlatList, View, StatusBar, ScrollView, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import { QuantityButton, HeaderBar } from '_molecules';
import { SquareList } from '_organisms';
import styles from './style';
import {Picker} from '@react-native-community/picker';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext, customRound, getProductsSubtotals, currencyFormat } from '_utils';

const ShoppingCartTemplate = (props) => {
    const { productsSubtotal  } = getProductsSubtotals(props.coupon, props.products, 3600);
    const subtotalNeeded = 20000 - productsSubtotal;

    const getDeliveryTime = () => {
        let response = '0';

        if(props.deliveryTimeType) {
            if(totalProducts > 10){
                response = props.deliveryTimeType.deliveryTypeId != 1 ? props.deliveryTimeType.deliveryTypeId : '0';
            } else {
                response = props.deliveryTimeType.deliveryTypeId;  
            }
        }

        const selected = displayDeliveryTimes && displayDeliveryTimes.filter(item => item.deliveryTypeId == response)[0];
        props.onSetDeliveryTimeType(selected);

        return response;
    }

    const totalProducts = props.products.reduce((carry, current) => {
        return carry + current.quantity;
    }, 0);
    const displayDeliveryTimes = props.deliveryTimeTypes && props.deliveryTimeTypes.filter(item => {
        return totalProducts > 10 ?  item.deliveryTypeId != 1 : true;
    });
    const displayDeliveryTime = getDeliveryTime();


    const components = [
        /*  Devlivery Mode, Payment method */
        (
            <View
                style={[styles.sectionContainer]}
            >
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex: 60,
                        justifyContent: 'center'
                    }}>
                        <Text>
                            Método de pago
                        </Text>
                    </View>
                    <View style={{
                        flex: 40,
                        justifyContent: 'center'
                    }}>
                        <Picker
                        selectedValue={props.paymentMethod ? props.paymentMethod.id : '0'}
                        style={{height: 50, fontSize: 14}}
                        itemStyle={{fontSize: 14, height: 50}}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = props.paymentMethods.filter(item => item.id == itemValue)[0];
                            props.onSetPaymentMethod(selected);
                        }}>
                            {
                                props.paymentMethods && props.paymentMethods.map((item, index) => {
                                    return (
                                    <Picker.Item 
                                        key={index.toString()} 
                                        label={item.name}
                                        value={item.id} 
                                        />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
            </View>
        ),
        /* Devlivery Mode, Payment method */
        (
            <View
                style={styles.sectionContainer}
            >
                { displayDeliveryTimes &&
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex: 60,
                        justifyContent: 'center'
                    }}>
                        <Text>
                            Modo de entrega
                        </Text>
                    </View>
                    
                    <View style={{
                        flex: 40,
                        justifyContent: 'center'
                    }}>
                        <Picker
                        selectedValue={displayDeliveryTime}
                        style={{height: 50, fontSize: 14}}
                        itemStyle={{fontSize: 14, height: 50}}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = displayDeliveryTimes.filter(item => item.deliveryTypeId == itemValue)[0];
                            props.onSetDeliveryTimeType(selected);
                        }}>
                            {
                                displayDeliveryTimes && displayDeliveryTimes.map((item, index) => {
                                    return (
                                    <Picker.Item 
                                        key={index.toString()} 
                                        label={item.name}
                                        value={item.deliveryTypeId} 
                                        />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                          
                </View>
                }
                { displayDeliveryTime == '2' && props.dates &&
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex: 60,
                        justifyContent: 'center'
                    }}>
                        <Text>
                            Fechas disponibles
                        </Text>
                    </View>
                    <View style={{
                        flex: 40,
                        justifyContent: 'center'
                    }}>
                        <Picker
                        selectedValue={props.date ? props.date.date: ''}
                        style={{height: 50, fontSize: 14}}
                        itemStyle={{fontSize: 14, height: 50}}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = props.dates.filter(item => item.date == itemValue)[0];
                            props.onSetDate(selected);
                        }}>
                            {
                                props.dates && props.dates.map((item, index) => {
                                    let dayOfWeek = '';

                                    switch(item.date) {
                                        case 1:
                                            dayOfWeek = 'Dom';
                                            break;
                                        case 2:
                                            dayOfWeek = 'Lun';
                                            break;
                                        case 3:
                                            dayOfWeek = 'Mar';
                                            break;
                                        case 4:
                                            dayOfWeek = 'Mié';
                                            break;
                                        case 5:
                                            dayOfWeek = 'Jue';
                                            break;
                                        case 6:
                                            dayOfWeek = 'Vie';
                                            break;
                                        case 7:
                                            dayOfWeek = 'Sáb';
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                    <Picker.Item 
                                        key={index.toString()} 
                                        label={dayOfWeek ? `${dayOfWeek} - ${item.day}/${item.month}`: ''}
                                        value={item.date} 
                                        />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                } 
                { displayDeliveryTime == '2' && props.intervals &&
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex: 60,
                        justifyContent: 'center'
                    }}>
                        <Text>
                            Intervalos disponibles
                        </Text>
                    </View>
                    <View style={{
                        flex: 40,
                        justifyContent: 'flex-start'
                    }}>
                        <Picker
                        selectedValue={props.dateInterval ? props.dateInterval.id: '0'}
                        style={{height: 50, fontSize: 14}}
                        itemStyle={{fontSize: 14, height: 50}}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = props.intervals.filter(item => item.id == itemValue)[0];
                            props.onSetDateInterval(selected);
                        }}>
                            {
                                props.intervals && props.intervals.map((item, index) => {
                                    return (
                                    <Picker.Item 
                                        key={index.toString()} 
                                        label={item.interval}
                                        value={item.id} 
                                        />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                } 
            </View>
        ),
        /* Products List */
        (
            <View
                style={styles.sectionContainer}
            >
                <ShoppingCartProductList 
                    items={props.products}
                />
            </View>
        ),
        (
            <View
                style={[styles.sectionContainer, {
                    marginBottom: 10
                }]}
            >
                    <Button
                        title='Vaciar Carrito de Compras'
                        containerStyle={{
                            flex:40,
                            height: 40, 
                            borderRadius: 10,
                        }}
                        buttonStyle={{
                            backgroundColor:'rgba(249,22,116,1)'
                        }}
                        
                        onPress={ () => {
                            Alert.
                                alert(
                                    'Alerta',
                                    '¿Desea vaciar el carrito de compras?',
                                    [
                                        {
                                            text: 'Sí',
                                            onPress: () => {
                                                props.onCleanShoppingCart();
                                            }
                                        },
                                        {
                                            text: 'No'
                                        }
                                    ],
                                    {
                                        cancellable: false
                                    }
                                )
                        } }       
                    />
            </View>
        ),
        /** Bill Detail */
        (
            <View
                style={styles.sectionContainer}
            >
                <BillDetail 
                    products={props.products}
                    tax={0}
                    deliveryCost={3600}
                    coupon={props.coupon}
                />
            </View>
        )
    ];

    return (
        <KeyboardAvoidingView style={styles.container} 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
        <StatusBar 
            backgroundColor='rgba(249,22,116,1)' 
            translucent={true} 
            barStyle='light-content'/>
            {/* 
                Header
            */}
            <HeaderBar  hasShoppingCart={false}  addresses={[]} hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
            {
                subtotalNeeded > 0 &&
                <Text style={{
                    backgroundColor:'red',
                    color: '#ffffff',
                    textAlign: 'center'
                }}> 
                    Te faltan $ {currencyFormat(subtotalNeeded)} para el pedido mínimo
                </Text>
            }

            <FlatList 
                data={components}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => item}
                ItemSeparatorComponent={() => <VerticalSeparator/>}
            />
            
            <View
                style={[styles.sectionContainer]}
            >
                <CouponCode
                    coupon = {props.coupon}
                    style={{marginBottom:10,marginTop:5}}
                    onSetValue={(couponCode) => {
                        props.onSetCoupon(couponCode);
                    }}
                />
            </View>
            <View
                style={[styles.sectionContainer, {
                        paddingRight: 0,
                        paddingLeft: 0,
                }]}
            >
                <TopRoundedCard
                    isEnable={subtotalNeeded <= 0}
                    buttonText="Continuar"
                    onPress={() => {
                        if(subtotalNeeded <= 0) {
                            props.onSave();
                        }
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};
const TopRoundedCard = (props) => {
    return (
        <View style={{
                backgroundColor: "#FFFFFF",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                padding: 15,
                width: "100%",
                borderWidth: 1,
                borderColor: "#a3a3a3",
                elevation: 50,
        }}>
            <Button 
                    raised
                    title={ props.buttonText }
                    onPress={ props.onPress }
                    containerStyle= { {
                        width: "100%",
                        alignSelf: "center",
                        flexBasis: "auto",
                        borderRadius: 10,
                        height: 40
                    } }
                    buttonStyle= { {
                        backgroundColor: props.isEnable ? "rgba(249,22,116,1)" : '#919191'
                    } }
                />
            <View style={{
                width: "25%",
                alignSelf: "center",
                flexBasis: "auto",
                height: 5,
                backgroundColor: '#000',
                marginTop: 10,
                borderRadius: 50
            }}></View>
        </View>
    );
}

const VerticalSeparator = (props) => {
    const backgroundColor = `rgba(0,0,0,${props.opacity || 1})`;

    return (
        <View style={[{
            height: 1,
            width: '100%',
            backgroundColor: backgroundColor
        },props.style]}></View>
    );
}

const CouponCode = (props) => {
    const [value, setValue] =  useState("");

    return (
        <View style={[{
            flexDirection: 'row'
        },props.style]}>
            {
                !props.coupon && 
                <View style={{
                    borderStyle: 'dashed',
                    borderColor: '#919191',
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 40,  
                    marginRight: 10,          
                    flex: 60
                }}>
                    <TextInput
                        editable={!props.coupon} 
                        value={value}
                        onChangeText={setValue}
                        style={{
                            height: '100%',
                            paddingLeft: 15,
                            paddingRight: 15
                        }}       
                    />
                </View>
            }
            {
                !props.coupon &&
                <Button 
                    title='Aplicar'
                    containerStyle={{
                        flex:40,
                        height: 40, 
                        borderRadius: 10,
                    }}
                    buttonStyle={{
                        backgroundColor:'#919191'
                    }}
                    onPress={() => {
                        props.onSetValue(value);
                    }}
                />
            }
            {
                props.coupon &&
                <Button 
                    title='Remover'
                    containerStyle={{
                        flex:1,
                        height: 40, 
                        borderRadius: 10,
                    }}
                    buttonStyle={{
                        backgroundColor:'#919191'
                    }}
                    onPress={() => {
                        setValue("");
                        props.onSetValue("");
                    }}
                />
            }
        </View>
    )
}

const BillDetail = (props) => {
    const { productsSubtotal, productsDeliveryCost, productTotalDiscount } = getProductsSubtotals(props.coupon, props.products, props.deliveryCost);
    const totalTax = customRound((((productsSubtotal + productsDeliveryCost) * props.tax) / 100));
    const total = productsSubtotal + productsDeliveryCost + totalTax;

    let discountLine = null;

    if(productTotalDiscount && productTotalDiscount > 0 ) {
        discountLine = (
            <View style={{ marginBottom:5, flexDirection:'row', justifyContent:'space-between'}}>
               <Text>
                   Descuento de cupón
               </Text>
               <Text>
                   {currencyFormat(productTotalDiscount)}
               </Text>
            </View> 
        );
    }
    
    return (
        <View>
            <Text style={{fontSize: 20, marginBottom:10}}>Detalle cuenta</Text>
            <View style={{ marginBottom:5, flexDirection:'row', justifyContent:'space-between'}}>
               <Text>
                   Valor pedido
               </Text>
               <Text>
                   {currencyFormat(productsSubtotal)}
               </Text>
            </View> 
            {
               totalTax > 0 && 
               (
               <View style={{marginBottom:5, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text>
                        Impuestos
                    </Text>
                    <Text>
                        {currencyFormat(totalTax)}
                    </Text>
                </View> 
               )               
            }

            <View style={{ marginBottom:5, flexDirection:'row', justifyContent:'space-between'}}>
               <Text>
                   Domicilio
               </Text>
               <Text>
                   {currencyFormat(productsDeliveryCost)}
               </Text>
            </View>
            {discountLine}
            <VerticalSeparator style={{marginTop:5}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginBottom:10}}>
               <Text style={{fontWeight:'bold', fontSize:18}}>
                   Total a Pagar
               </Text>
               <Text>
                   {currencyFormat(total)}
               </Text>
            </View>
        </View>
    );
}

const ShoppingCartProductList = (props) => {
    return (
        <View>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={props.items}  
                renderItem={({item}) => <ShoppingCartProductListItem {...item}/>}
                ItemSeparatorComponent= {() => <VerticalSeparator opacity={0.3}/>}
            />
        </View>
    );
};

const ShoppingCartProductListItem = (props) => {
    const { removeShoppingCartProduct, addShoppingCartProduct, shoppingCart } = useContext(AppContext);
    const [quantity, setQuantity] = useState(0);
    let promotion = props.promotion;
    let subtotal = props.price;
    let promotionDescription = null;
    let totalPrice = 0;

    const onSetCount = (value) => {
        if(value > quantity) {
            addShoppingCartProduct({
                ...props,
                quantity: value
            });
        }
        if(value < quantity) {
            removeShoppingCartProduct({
                ...props,
                quantity: value
            });
        }
    }
    useEffect(() => {
        if(shoppingCart && shoppingCart.products && shoppingCart.products.length) {
            const shoppingCartProduct = shoppingCart.products.filter(item => item.id == props.id)[0];

            if(shoppingCartProduct) {
                setQuantity(shoppingCartProduct.quantity);
            } else {
                setQuantity(0);               
            }
        } else {
            setQuantity(0);
        }
    });

    if(promotion) {
        let amount = 0;

        if(promotion.type == 1) {
            // validate that subtotal don't down under 0
            amount = promotion.amount <= 100 ? promotion.amount : 100;

            subtotal = props.price * (1 - (amount / 100));
            promotionDescription = promotion.description || `${amount}% de oferta`;
        }

        if(promotion.type == 2) {
            amount = promotion.amount <= props.price ? promotion.amount : props.price;

            subtotal = props.price - amount;
            promotionDescription = promotion.description || `${currencyFormat(amount)} de descuento`;
        }

        if(promotion.type == 3) {
            subtotal = props.price;
            promotionDescription = promotion.description || 'Envío gratis';
        }
        
    }

    totalPrice = customRound(subtotal) * quantity;

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingTop: 15,
            paddingBottom: 15
        }}>
            <View style={{
                flex: 40
            }}>
                    <Text 
                    numberOfLines={3}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>
                        {props.name}
                    </Text>
                    <Text 
                    numberOfLines={2}
                    style={{
                        opacity: 0.5,
                        fontSize: 12
                    }}>
                        {props.description}
                    </Text>
                    {
                        promotionDescription && 
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(249,22,116,0.5)',
                            minWidth: 100,
                            maxWidth: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            borderColor: 'rgba(249,22,116,1)',
                            marginTop: 25
                        }}>
                            <Text style={
                                    {
                                        fontSize: 15,
                                        textAlign: 'center',
                                        alignSelf:'center'
                                    }
                                }>
                                    {promotionDescription}
                            </Text>
                        </View>
                    }
            </View>
            <View style={{
                flex: 20,
                paddingLeft: 15,
                paddingRight: 15
            }}>
                <QuantityButton 
                borderStyle={'solid'}
                onSetCount={onSetCount} 
                count={quantity}
                 width='100%' />
            </View>
            <View style={{
                flex: 40
            }}>
                <View style={{height:40, justifyContent: 'center', alignItems:'flex-end'}}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18
                }}> 
                   {currencyFormat(totalPrice)}
                </Text>
                </View>
                <View style={{flex: 1 , justifyContent: 'flex-end', alignItems:'flex-end'}}>
                    <Button
                        icon={
                            <Icon
                            name="trash"
                            size={20}
                            color="rgba(249,22,116,1)"
                            />
                        }
                        
                        onPress={ () => {
                            Alert.
                                alert(
                                    'Alerta',
                                    '¿Desea remover el producto del carrito de compras?',
                                    [
                                        {
                                            text: 'Sí',
                                            onPress: () => {
                                                onSetCount(0);
                                            }
                                        },
                                        {
                                            text: 'No'
                                        }
                                    ],
                                    {
                                        cancellable: false
                                    }
                                )
                        } }
                        containerStyle= {  {
                        } }
                        buttonStyle= {  {
                            backgroundColor: "transparent"
                        } }        
                    />
                </View>
            </View>
        </View>
    );
};

export default ShoppingCartTemplate;