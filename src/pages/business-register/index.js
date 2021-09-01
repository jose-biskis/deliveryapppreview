import React, {useState, useEffect} from 'react';
import { BusinessRegisterTemplate } from '_templates';
import { BusinessRegisterService } from '_services';
import { Alert } from 'react-native';

const BusinessRegister = ({navigation}) => {
    const [isSubscribed, setIsSubscribed] = useState(true);

    useEffect(() => {
        setIsSubscribed(true);

        return () => {
            setIsSubscribed(false);
        }
    });

    const onSave = (data) => {
        BusinessRegisterService
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

    const data = {
        categories: [
            {
                id: "1",
                text: "Negocio Tipo A"
            },
            {
                id: "2",
                text: "Negocio Tipo B"
            },
            {
                id: "3",
                text: "Negocio Tipo C"
            }
        ]
    }

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }
    
    return (      
        <BusinessRegisterTemplate
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            addresses={null}
            hasShoppingCart={false}
            onSave={onSave}
            data={data}    
            onPressMenuButton={onPressMenuButton}      
        />
    );
}

export default BusinessRegister;
