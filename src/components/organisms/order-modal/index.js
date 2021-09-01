import React, {useEffect, useState} from 'react';
import { Modal, View, Text, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { default as OrderDetail } from '../order-detail/index';
import styles from './style';

const OrderModal = ({isModalVisible, onModalClose, order}) => {
    const totalStatus = 5;
    let progress = order ? ((order.status.id * 100) / totalStatus) : 0;
    let progressClass = `${progress}%`;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);
    const [restart, setRestart] = useState(false);
    const initialCounterTime = order ? (order.deliveryCounterTime || 30) : 30;
    
    const originalDate = new Date(order && order.lastUpdate);
    const nowDate = new Date();
    const calculatedDate = new Date(nowDate);
    originalDate.setTime(originalDate.getTime() + (nowDate.getTimezoneOffset() * 60000));
    calculatedDate.setTime(originalDate.getTime() + (initialCounterTime * 60000));
    nowDate.setTime(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000));


    const onSetTimer = (newMinutes, newSeconds) => {
        let convertedMinutes = "00".substr((newMinutes).toString().length) + newMinutes;
        let convertedSeconds = "00".substr((newSeconds).toString().length) + newSeconds;
        setTimer(`${convertedMinutes}:${convertedSeconds}`);
    };

    /*
    const isValidTime = () => {
        const originalDate = new Date(order.lastUpdate);
        const nowDate = new Date();
        const originalMinute = originalDate.getMinutes() + 1;
        const originalSeconds = originalDate.getSeconds() + 1;
        const nowMinute = nowDate.getMinutes() + 1;
        const nowSecond = nowDate.getSeconds() + 1;

        console.log({originalMinute, nowMinute});

        return (nowMinute >= originalMinute) && (nowSecond >= originalSeconds);
    }*/
    const isValidTime = () => {
        console.log({nowDate, originalDate, calculatedDate, timezone: nowDate.getTimezoneOffset() });

        return nowDate < calculatedDate;
    }

    const getTime = (now, original, counter) => {
        let diff = 0;

        if(now < original) {
            diff = 60 - original;
            diff += now;
        } else {
            diff = now - original;
        }

        if(diff > counter) {
            diff -= counter;
        }

        return counter - diff;
    }
    const resetTimer = () => {
        const calculatedMinutes = calculatedDate.getMinutes() + 1;
        const calculatedSeconds = calculatedDate.getSeconds() + 1;
        const nowMinute = nowDate.getMinutes() + 1;
        const nowSecond = nowDate.getSeconds() + 1;

        const minutesTime = getTime(nowMinute, calculatedMinutes, initialCounterTime);
        const secondsTime = getTime(nowSecond, calculatedSeconds, 60);


        setMinutes(minutesTime);
        setSeconds(secondsTime);
    }; 
    /*
    const resetTimer = () => {
        const originalDate = new Date(order.lastUpdate);
        const nowDate = new Date();
        console.log({originalDate, nowDate});
        const originalMinute = originalDate.getMinutes() + 1;
        const originalSeconds = originalDate.getSeconds() + 1;
        const nowMinute = nowDate.getMinutes() + 1;
        const nowSecond = nowDate.getSeconds() + 1;

        const minutesTime = getTime(nowMinute, originalMinute, initialCounterTime);
        const secondsTime = getTime(nowSecond, originalSeconds, 60);


        setMinutes(minutesTime);
        setSeconds(secondsTime);
    }; 
    */

    useEffect(() => {
        let timeout = null;

        if(order && order.status.id == 3 && order.deliveryTime.deliveryTypeId == 1) {
            if(restart) {
                if(isValidTime()) {
                    resetTimer();             
                } else {
                    setMinutes(0);
                    setSeconds(0);
                }
                setRestart(false);
            }
    
            if(minutes > 0 || (minutes == 0 && seconds > 0)) {
                timeout = setTimeout(() => {
                    if(seconds == 0) {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                        onSetTimer(minutes - 1, 59); 
                    } else {
                        setSeconds(seconds - 1);
                        onSetTimer(minutes, seconds - 1); 
                    }
                }, 1000); 
            } else {         
                if(order.lastUpdate) {
                    if(isValidTime()) {
                        resetTimer();             
                    } else {
                        onSetTimer(minutes, seconds); 
                    }
                }
                
            }
        }  

        return () => {
            if(timeout) {
                clearTimeout(timeout);
            }
        };
    }, [minutes, seconds, order, restart]);

    useEffect(() => {
            setRestart(isModalVisible);
            setTimer(null);
    }, [isModalVisible]);

    return (
        <Modal
        
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        {  order &&
            <View style={styles.centeredView}
            >
                <TouchableWithoutFeedback onPress={onModalClose}>
                <View  
                    style={{
                        position: 'absolute', 
                        backgroundColor: 'transparent', 
                        height: '100%', 
                        width:'100%'
                    }}
                >           
                </View>
                </TouchableWithoutFeedback>
                <Text style={{color: '#ffffff'}} onPress={onModalClose}>Presione acá para cerror</Text>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Orden: {order.id}</Text>
                    <View style={
                            {   
                                height: 10,
                                width: '80%',
                                backgroundColor: '#A3A3A3',
                                borderRadius: 5,
                                overflow: "hidden",
                                marginBottom: 15
                            } 
                        }>
                            <View style={
                                {   
                                    height: "100%",
                                    width: progressClass,
                                    backgroundColor: 'rgba(249,22,116,1)',
                                    //backgroundColor: 'rgba(255,222,72,1)'
                                }
                            }></View>
                        </View>
                   
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginBottom: 15
                    }}>{order.status.name}</Text>
                    {
                        order && 
                        order.status.id == 3 && 
                        order.deliveryTime.deliveryTypeId == 1 &&

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginBottom: 15
                        }}>{timer}</Text>
                    }
                    <View style={{
                        width: '100%',
                        height: 10,
                        backgroundColor: '#F3F3F3'
                    }}></View>
                    <View style={{width: '100%', flex: 1}}>
                        <OrderDetail
                            coupon={order.coupon}
                            products={order.products}
                        />
                    </View>
                </View>
                
                
            </View>
        }
      </Modal>
      );
}




export default OrderModal;