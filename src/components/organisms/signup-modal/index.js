import React, { useState } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { default as SigninForm } from '../signin-form/index';
import styles from './style';

const SignupModal = ({isModalVisible, onModalClose, setNextStep, step }) => {
    return (
        <Modal      
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        {   
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
                    { step && <SigninForm step={ step } onNextStep={ setNextStep } onExclusiveSignin={null} hasExclusiveSignin={false}/> }
                </View>
                
                
            </View>
        }
      </Modal>
      );
}

export default SignupModal;