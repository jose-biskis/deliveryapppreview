import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';


const post = (body) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.post({
                    url: CoreService.businessRegisterUrl,
                    pathParams: {
                        path: 'notificar'
                    },
                    params: null,
                    headers: {
                        'X-NOTIFICATION-TYPE': 'business-register',
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: body
                }, (item) => {
                    return {
                        type: item.tipo,
                        description: item.descripcion
                    }
                }, (item) => {
                    return {
                        tipo: item.type,
                        descripcion: item.description
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
}

const BusinessRegisterService = {
    post
};



export default BusinessRegisterService;