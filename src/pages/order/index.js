import React, {useState, useEffect, useContext} from 'react';
import { OrderTemplate } from '_templates';
import { OrderService } from '_services';
import { AppContext } from '_utils';

const Order = ({ navigation }) => {
    const { orders, oldOrders } = useContext(AppContext);
    const [ ordersState, setOrdersState] = useState(null);
    const [ oldOrdersState, setOldOrdersState] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        setOrdersState(orders);
    }, [orders]);

    useEffect(() => {
        setOldOrdersState(oldOrders);
    }, [oldOrders]);

    const onSelectOrder = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    } 

    const onModalClose = () => {
        setSelectedOrder(null);
        setModalVisible(!modalVisible);    
    }

    return (      
        <OrderTemplate
            onNavigateBack={() => {
                navigation.goBack();
            }}
            isModalVisible={modalVisible}
            selectedOrder={selectedOrder}
            onSelectOrder={onSelectOrder}
            onModalClose={onModalClose}
            hasBack={true} 
            orders={ordersState && ordersState.filter(item => item.statusId > 0)}
            oldOrders={oldOrdersState}
        />
    );
}

export default Order;
