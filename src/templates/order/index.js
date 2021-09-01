import React, {useState} from 'react';
import { SafeAreaView, View, StatusBar, TouchableWithoutFeedback, Text } from 'react-native';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { OrderList, OrderModal } from '_organisms';
import styles from './style';
import { VerticalSeparator } from '_atoms';

const OrderTemplate = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);

    let componentTab = null;
    
    if(selectedTab == 0) {
        componentTab = (
            <View
                style={styles.sectionContainer}
            >
                <OrderList 
                    title="Pedidos activos"
                    itemsToShow= { null }
                    items= { props.orders }
                    onSelectOrder={props.onSelectOrder }
                />
            </View>
        );
    } else {
        componentTab = (
            <View
                style={styles.sectionContainer}
            >
                <OrderList 
                    title="Historial"
                    itemsToShow= { null }
                    items= { props.oldOrders }
                    onSelectOrder={props.onSelectOrder }
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar 
            backgroundColor='rgba(249,22,116,1)' 
            translucent={true} 
            barStyle='light-content'/>
            <HeaderBar  hasShoppingCart={true}  hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
            <View
                style={{ 
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                <VerticalSeparator opacity={0.5} />
            </View>
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
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Pedidos Activos</Text>
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
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Historial de pedidos</Text>
                    </View>
                </TouchableWithoutFeedback >
            </View>
            { componentTab }
            <OrderModal 
                    order={props.selectedOrder}
                    onModalClose={props.onModalClose}
                    isModalVisible={props.isModalVisible}
                /> 
        </SafeAreaView>
    );
};

export default OrderTemplate;