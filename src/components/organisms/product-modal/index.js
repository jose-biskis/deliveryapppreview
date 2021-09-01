import React, {useEffect, useState} from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { default as ProductDetail } from '../product-detail/index';
import styles from './style';

const ProductModal = ({isModalVisible, onModalClose, product}) => {

    return (
        <Modal
        
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        {  product &&
            <View style={styles.centeredView}>
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
                <Text style={{color: '#ffffff'}} onPress={onModalClose}>Presione acá para cerrar</Text>
                <View style={styles.modalView}>
                    <View style={{width: '100%'}}>
                        <ProductDetail
                            product={product}
                        />
                    </View>
                </View>
            </View>
        }
      </Modal>
      );
}




export default ProductModal;