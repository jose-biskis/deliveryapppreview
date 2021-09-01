import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';

const post = (body) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.post({
                    url: CoreService.helpCenterUrl,
                    pathParams: {
                        path: 'notificar'
                    },
                    params: null,
                    headers: {
                        'X-NOTIFICATION-TYPE': 'help-center',
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: body
                }, (item) => {
                    return {
                        description: item.descripcion
                    }
                }, (item) => {
                    return {
                        descripcion: item.description
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
}

const HelpCenterService = {
    post
};



export default HelpCenterService;