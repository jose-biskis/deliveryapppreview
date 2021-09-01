import React, {useState, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { default as QuantityButton } from '../quantity-button/index';
import { AppContext, customRound, currencyFormat } from '_utils';

const ProductListItem = ({item, onSelectProduct}) => {
    //TODO: subir la lógica a unos componentes arriba
    const { removeShoppingCartProduct, addShoppingCartProduct, shoppingCart } = useContext(AppContext);
    const [quantity, setQuantity] = useState(0);
    let promotion = item.promotion;
    let subtotal = item.price;
    let promotionDescription = null;
    let isSoldOut = item.statusId == 5;

    const onSetCount = (value) => { 
        if(value > quantity) {
            addShoppingCartProduct({
                ...item,
                quantity: value
            });
        }
        if(value < quantity) {
            removeShoppingCartProduct({
                ...item,
                quantity: value
            });
        }
    }

    // TODO: remove this useEffect and [quantity, setQuantity] state
    // && user the shoppingCartProduct.quantity
    // All this in order to grow the app performance
    useEffect(() => {
        if(shoppingCart && shoppingCart.products && shoppingCart.products.length) {
            const shoppingCartProduct = shoppingCart.products.filter(product => item.id == product.id)[0];

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

            subtotal = item.price * (1 - (amount / 100));
            promotionDescription = promotion.description || `${amount}% de oferta`;
        }

        if(promotion.type == 2) {
            amount = promotion.amount <= item.price ? promotion.amount : item.price;

            subtotal = item.price - amount;
            promotionDescription = promotion.description || `${currencyFormat(amount)} de descuento`;
        }

        if(promotion.type == 3) {
            promotionDescription = promotion.description || 'Envío gratis';
        }
        
    }

    subtotal = customRound(subtotal);

    return (
        <TouchableOpacity
            onPress={() => {
                onSelectProduct(item);
            }} 
            style= {
                {
                    minHeight: 150,              
                    width: '100%',
                    flex: 1,
                    flexDirection: "column",
                    marginBottom: 10,
                    borderRadius: 15,
                    padding: 15,
                    overflow: 'hidden',
                    alignSelf: "center",
                    backgroundColor: "#ffffff",
                    shadowColor: '#000',
                    shadowOffset: { width: 10, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    elevation: 2                   
                }
            }
        >
            <View style={
                {
                    flexDirection: 'row',
                    flex: 1
                }
            }>
                <View style={
                    {
                        flexDirection: 'column',
                        flex: 1
                    }
                }>
                    <Text 
                    numberOfLines={3}
                    style={
                        {
                            fontWeight: 'bold',
                            fontSize: 18
                        }
                    }>{item.name}</Text>
                    <Text
                    numberOfLines={2}
                    style={{
                        opacity: 0.5,
                        fontSize: 12
                    }}>{item.description}</Text>
                    <View style={
                        {
                            backgroundColor: '#000',
                            width: '100%',
                            height: 1,
                            opacity: 0.5,
                            marginTop: 5,
                            marginBottom: 5
                        }
                    }></View>
                    {
                    promotionDescription &&
                    <Text
                        style={{
                            flex: 1,
                            opacity: 0.5,
                            fontSize: 18,
                            textDecorationLine: 'line-through',
                            textDecorationColor: 'rgba(0,0,0,0.5)',
                            textDecorationStyle: 'solid',
                        }}
                    >{currencyFormat(item.price)}</Text>  
                    }
                    <Text style={
                        {
                            fontWeight: 'bold',
                            fontSize: 18
                        }
                    }>
                        {currencyFormat(subtotal)}
                    </Text>
                    {
                    item.unitPrice &&
                        <Text
                        style={{
                            fontSize: 12,
                            marginBottom: 10
                        }}>{item.unitPrice}</Text>
                    }

                    {promotionDescription && <View style={{
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
                        marginTop: 5
                    }}>
                    <Text style={
                            {
                                fontSize: 15,                            
                                textAlign: 'center',
                                alignSelf:'center'
                            }
                        }>{promotionDescription}</Text>
                    </View>
                    }
                    {
                        !isSoldOut &&
                        <View style={{
                            marginTop: promotionDescription ? 25: 50
                        }}>
                            <QuantityButton
                                onSetCount={onSetCount}
                                count={quantity} 
                                width='100%'
                            />
                        </View>
                    }
                    {
                        isSoldOut &&
                        <View style={{
                            marginTop: promotionDescription ? 25: 50,
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
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20,                            
                                textAlign: 'center',
                                alignSelf:'center'
                            }}>
                                Agotado
                            </Text>
                        </View>                     
                    }

                </View>
                <View style={
                    {
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent:'center',
                        alignItems: 'center',
                        paddingLeft: 15
                    }
                }
                >   
                <View style={
                        {
                            height: 150,
                            width: 150,
                            borderRadius: 100,
                            elevation: 15,
                        }
                    }>
                    <Image 
                    PlaceholderContent={<ActivityIndicator />}    
                    style={
                        {
                            height: 150,
                            width: 150,
                            borderRadius: 100,
                        }
                    }
                    source={ item.imageUrl }/>
                </View>


                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductListItem;
