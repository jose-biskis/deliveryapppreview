import React from 'react';
import { View, Text } from 'react-native';
import { VerticalSeparator } from '_atoms';
import { customRound, currencyFormat } from '_utils';

const BillDetail = (props) => {

    const getProductsSubtotals = (coupon, products) => {
        let productsToApplyCouponSubtotal = 0;
        let subtotal = 0;
        let deliveryCost = props.deliveryCost;
        let totalDiscount = 0;

        products.forEach(product => {
            const { productSubtotal } = getProductSubtotals(product);

            if(coupon && (coupon.storeId == product.storeId)) {
                productsToApplyCouponSubtotal += productSubtotal;
            } else {
                subtotal += productSubtotal
            }
        });
        
        productsToApplyCouponSubtotal = customRound(productsToApplyCouponSubtotal);
        subtotal = customRound(subtotal);

        if(coupon && productsToApplyCouponSubtotal > 0) {
            const type = coupon.couponTypeId;

            switch(type) {
                case 1:
                    const percent = coupon.discount > 100 ? 100 : coupon.discount; 
                    totalDiscount = customRound((productsToApplyCouponSubtotal * percent) / 100);  
                    subtotal += (productsToApplyCouponSubtotal - totalDiscount);
                    break;
                case 2:
                    const amount = coupon.discount > productsToApplyCouponSubtotal ? productsToApplyCouponSubtotal : coupon.discount; 
                    totalDiscount = customRound(amount);
                    subtotal += (productsToApplyCouponSubtotal - amount);
                    break;
                default:
                    break;
            }
        }

        subtotal = customRound(subtotal);

        return {
            productsSubtotal: subtotal,
            productsDeliveryCost: subtotal < 150000 ? customRound(deliveryCost) : 0,
            productTotalDiscount: customRound(totalDiscount)
        };
    } 
    const getProductSubtotals = (product) => {
        const promotion = product.promotion;
        const quantity = product.quantity;
        let productSubtotal = 0;

        const promotionType = promotion ? promotion.type : 0;

        switch(promotionType) {
            case 1:
                const percent = promotion.amount > 100 ? 100 : promotion.amount; 
                productSubtotal += (product.price * (1 - (percent / 100)));
                break;
            case 2:
                const amount = promotion.amount > product.price ? product.price : promotion.amount; 
                productSubtotal += (product.price - amount);
                break;
            case 3:
                productSubtotal += product.price;
                break;
            default:
                productSubtotal += product.price;
                break;
        }
      
        return {
            productSubtotal: customRound(productSubtotal) * quantity
        }
    } 

    const { productsSubtotal, productsDeliveryCost, productTotalDiscount } = getProductsSubtotals(props.coupon, props.products);
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
               <View style={{marginBottom:5, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text>
                        Impuestos
                    </Text>
                    <Text>
                        {currencyFormat(totalTax)}
                    </Text>
                </View>
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

export default BillDetail;

