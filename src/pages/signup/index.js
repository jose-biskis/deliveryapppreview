import React, { useState } from 'react';
import { SignupTemplate } from '_templates';
import { Alert, BackHandler } from 'react-native';
import { useSignin } from '_utils';


const Signup = ({onComplete}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [step, setNextStep, onSetComplete, upStepCallback] = useSignin(onComplete, setModalVisible);

    const onModalClose = () => {
        setModalVisible(!modalVisible);    
    }

    const onContinue = () => {
        upStepCallback();
        setModalVisible(false);
    }

    const onCancel = () => {
        Alert
            .alert(
                "Alerta",
                "Si cancela, el app se cerrará",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            BackHandler.exitApp()
                        }
                    },
                    {
                        text: "Cancelar"
                    }
                ],
                {
                    cancelable: false
                }
            )   
    }

    const onExclusiveSignin = () => {
        onComplete(true);   
    }

    return (
        <SignupTemplate 
            onExclusiveSignin={onExclusiveSignin}
            isModalVisible={modalVisible}
            onModalClose={onModalClose}
            onContinue={onContinue}
            onCancel={onCancel}
            step={step}
            setNextStep={setNextStep}
        />
    );
};

export default Signup;