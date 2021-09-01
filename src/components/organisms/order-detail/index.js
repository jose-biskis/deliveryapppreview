import React, {useState} from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { default as BillDetail } from '../bill-detail/index';
import { default as ShoppingCartProductList } from '../shopping-cart-product-list/index';

const OrderDetail = ({coupon, products}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    let componentTab = null;
    
    if(selectedTab == 0) {
        componentTab = (
            <View style={{
                paddingTop: 10, paddingRight: 10, paddingLeft:10
                           }}>
                <ShoppingCartProductList 
                    isBrief={true}
                    items={products}
                />
            </View>
        );
    } else {
        componentTab = (
            <View style={{
                paddingTop: 10, paddingRight: 10, paddingLeft:10
            }}>
                <BillDetail 
                        isBrief={true}
                        products={products}
                        tax={0}
                        deliveryCost={3600}
                        coupon={coupon}
                />
            </View>
        );
    }
    return (
        <View style={{
            flex:1
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <TouchableWithoutFeedback 
                style={{
                    flex:1
                }}
                onPress={() => setSelectedTab(0)}>
                    <View style={{
                        height: 40,
                        flex: 1, 
                        justifyContent: 'center', 
                        alignItems:'center',  
                        borderBottomWidth: 2,
                        borderBottomColor: selectedTab == 0 ? 'rgba(249,22,116,1)' : '#F3F3F3'                
                    }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Detalle Pedido</Text>
                    </View>
                </TouchableWithoutFeedback >
                <TouchableWithoutFeedback 
                                style={{
                                    flex:1
                                }}
                onPress={() => setSelectedTab(1)}>
                    <View style={{
                        height: 40,
                        flex: 1, 
                        justifyContent: 'center', 
                        alignItems:'center',  
                        borderBottomWidth: 2,
                        borderBottomColor: selectedTab == 1 ? 'rgba(249,22,116,1)' : '#F3F3F3'                
                    }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Resumen de Compras</Text>
                    </View>
                </TouchableWithoutFeedback >
            </View>
            <View style={{flex:1}}>
                {componentTab}
            </View>
        </View>

    );
}

export default OrderDetail;