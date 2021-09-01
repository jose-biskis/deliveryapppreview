import React from 'react';
import {default as customRound} from '../custom-ceil/index';

const getProductsSubtotals = (coupon, products, initialDeliveryCost) => {
    let productsToApplyCouponSubtotal = 0;
    let subtotal = 0;
    let deliveryCost = initialDeliveryCost;
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

export default getProductsSubtotals;