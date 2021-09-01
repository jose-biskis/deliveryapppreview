import React, {useState, useEffect, useContext} from 'react';
import { ProfileTemplate } from '_templates';
import { ProfileService } from '_services';
import { Alert } from  'react-native';
import { AppContext } from '_utils';

const Profile = ({ navigation }) => {
    const appContext = useContext(AppContext);
    const [profile, setProfile] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [isItemSubscribed, setIsItemSubscribed] = useState(true);

    useEffect(() => {
        setIsSubscribed(true);

        if(isSubscribed && isItemSubscribed) {
            ProfileService
            .getItem()
            .catch(error => {
                console.log('Error:', error);
                setIsItemSubscribed(false);
            })
            .then(response => {
                if(isSubscribed) {
                    setProfile(response);
                    appContext.setProfile(response);
                }
                setIsItemSubscribed(false);
            });
        }


        return () => (setIsSubscribed(false));
    }, [profile, isItemSubscribed])


    const onSave = (data) => {
        ProfileService
        .put(data)
        .catch(error => {
            if(isSubscribed) {
                Alert.alert(
                    "Error",
                    "No se ha podido actualizar el perfil",
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
                    "El perfil se ha actualizado exitosamente",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                setProfile(response);
                appContext.setProfile(response);
            }
        });
    };

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }
    const addresses = [
        {
            id: '1',
            text: "Calle 87 - 65 - Bomboná",
            isSelected: true
        }, 
        {
            id: '2',
            text: "Calle 97 - 75 - Poblado",
            isSelected: false          
        }
    ];

    return (      
        <ProfileTemplate 
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            addresses={addresses}
            onSave={onSave}
            data={profile}   
            onPressMenuButton={onPressMenuButton}       
        />
    );
}

export default Profile;
