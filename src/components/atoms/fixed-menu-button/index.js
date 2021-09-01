import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const FixedMenuButton = (props) => {
    return (
        <Button 
            raised
            icon={ 
                <Icon
                name="bars"
                size={25}
                color="white"
            />
            }
            containerStyle= {{
                width: 70,
                height: 70,
                borderRadius: 100,
                position: 'absolute',
                bottom: 15,
                right: 15,
            }}
            buttonStyle= { {
                height: '100%',
                backgroundColor: "rgba(249,22,116,1)"
            } }
            onPress={props.onPress}
        />
    );
};

export default FixedMenuButton;