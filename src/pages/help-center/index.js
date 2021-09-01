import React, {useState, useEffect} from 'react';
import { HelpCenterTemplate } from '_templates';
import { HelpCenterService } from '_services';
import { Alert } from  'react-native';

const HelpCenter = ({navigation}) => {
    const [isSubscribed, setIsSubscribed] = useState(true);

    useEffect(() => {
        setIsSubscribed(true);

        return () => {
            setIsSubscribed(false);
        }
    });

    const onSave = (data) => {
        HelpCenterService
        .post(data)
        .catch(error => {
            console.log('Error:', error);
            if(isSubscribed) {
                Alert.alert(
                    "Error",
                    "No se ha podido enviar el mensaje",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }
        })
        .then(response => {
            if(isSubscribed) {
                Alert.alert(
                    "Éxito",
                    "El mensaje se ha enviado exitosamente",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }
        });
    };


    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    return (      
        <HelpCenterTemplate
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            addresses={null}
            hasShoppingCart={false}
            onSave={onSave}
            onPressMenuButton={onPressMenuButton}
        />
    );
}

export default HelpCenter;
