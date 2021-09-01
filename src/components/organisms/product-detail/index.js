import React, {useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { QuantityButton } from '_molecules';
import { AppContext, currencyFormat } from '_utils';

const ProductDetail = ({product}) => {
    //TODO: subir la lógica a unos componentes arriba
    const { removeShoppingCartProduct, addShoppingCartProduct, shoppingCart } = useContext(AppContext);
    const [ quantity, setQuantity ] = useState(0);
    let promotion = product.promotion;
    let subtotal = product.price;
    let promotionDescription = null;
    let isSoldOut = product.statusId == 5;

    const onSetCount = (value) => { 
        if(value > quantity) {
            addShoppingCartProduct({
                ...product,
                quantity: value
            });
        }
        if(value < quantity) {
            removeShoppingCartProduct({
                ...product,
                quantity: value
            });
        }
    }

    // TODO: remove this useEffect and [quantity, setQuantity] state
    // && user the shoppingCartProduct.quantity
    // All this in order to grow the app performance
    useEffect(() => {
        if(shoppingCart && shoppingCart.products && shoppingCart.products.length) {
            const shoppingCartProduct = shoppingCart.products.filter(item => item.id == product.id)[0];

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

            subtotal = product.price * (1 - (amount / 100));
            promotionDescription = promotion.description || `-${amount}%`;
        }

        if(promotion.type == 2) {
            amount = promotion.amount <= product.price ? promotion.amount : product.price;

            subtotal = product.price - amount;
            promotionDescription = promotion.description || `-${currencyFormat(amount)}`;
        }

        if(promotion.type == 3) {
            promotionDescription = promotion.description || 'Envío gratis';
        }
        
    }

    return (
        <View style={{
        }}>
            <View style={{
                paddingTop: 10, paddingRight: 10, paddingLeft:10
            }}>
                <View
                    style={{                    
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10
                    }}
                >
                    <View style={
                            {
                                height: 150,
                                aspectRatio: 1,
                                borderRadius: 100,
                                elevation: 15,
                            }
                        }>
                        <Image 
                        PlaceholderContent={<ActivityIndicator />}    
                        style={
                            {
                                height: 150,
                                aspectRatio: 1,
                                borderRadius: 100,
                            }
                        }
                        source={ product.imageUrl }/>
                    </View>
                </View>
                    <Text style={
                        {
                            fontWeight: 'bold',
                            fontSize: 18,
                            alignSelf: 'center',
                            textAlign: 'center'
                        }
                    }>{product.name}</Text>
                    <Text
                    style={{
                        fontSize: 12,
                        alignSelf: 'center',
                        marginBottom: 10,
                        textAlign: 'center'
                    }}>{product.description}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}    
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            alignSelf: 'center',
                            textAlign: 'center',
                            flex: 1
                        }}
                    >{currencyFormat(subtotal)}</Text>  
                    {
                    promotionDescription &&
                    <Text
                        style={{
                            flex: 1,
                            opacity: 0.5,
                            fontSize: 18,
                            alignSelf: 'center',
                            textDecorationLine: 'line-through',
                            textDecorationColor: 'rgba(0,0,0,0.5)',
                            textDecorationStyle: 'solid',
                            textAlign: 'center'
                        }}
                    >{currencyFormat(product.price)}</Text>  
                    }
                    {
                    promotionDescription && 
                    <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        aligItems: 'center'
                    }}>
                        <View
                            style={{                             
                                flexDirection: 'row',
                                backgroundColor: 'rgba(249,22,116, 1)',
                                maxWidth: 120,
                                paddingLeft: 5,
                                paddingRight: 5,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: 'rgba(249,22,116,1)'
                            }}
                        >
                        <Text style={{
                                fontSize: 15,                            
                                textAlign: 'center',
                                alignSelf:'center'
                            }}
                        >{promotionDescription}</Text>
                        </View>
                    </View>
                    
                    }  
                </View> 
                {
                    product.unitPrice &&
                    <Text
                    style={{
                        fontSize: 12,
                        alignSelf: 'center',
                        marginBottom: 10
                    }}>{product.unitPrice}</Text>
                }
                {
                        !isSoldOut &&
                        <View style={{
                                marginTop: 25,
                                flexDirection: 'row',
                                justifyContent: 'center'
                        }}>
                            <QuantityButton
                                onSetCount={onSetCount}
                                count={quantity} 
                                width='25%'
                            />
                        </View>
                    }
                    {
                        isSoldOut &&
                        <View style={{
                            marginTop: 25,
                            flexDirection: 'row',
                            backgroundColor: 'rgba(249,22,116,0.5)',
                            minWidth: 100,
                            maxWidth: 120,
                            height: 40,
                            alignSelf: 'center',
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
        </View>

    );
}

export default ProductDetail;