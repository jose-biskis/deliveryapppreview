import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { default as QuantityButton } from '../quantity-button/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { customRound, currencyFormat } from '_utils';

const ShoppingCartProductListItem = (props) => {
    let promotion = props.promotion;
    let subtotal = props.price;
    let promotionDescription = null;
    let totalPrice = 0;
    let quantity = props.quantity;

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
                flex: 50
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
                        !props.isBrief && promotionDescription && 
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
            { !props.isBrief &&
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
            }
            <View style={{
                flex: 30
            }}>
                <View style={{height:40, justifyContent: 'center', alignItems:'flex-end'}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}> 
                    {currencyFormat(totalPrice)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ShoppingCartProductListItem;