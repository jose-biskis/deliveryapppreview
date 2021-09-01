import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';

const validatePhone = (body) => {
    return new Promise((resolve, reject) => { 
        CoreService.post({
            url: CoreService.userUrl,
            pathParams: {
                path: 'validar-telefono'
            },
            params: null,
            headers: null,
            body: body
        }, (item) => {
            if(item.error) {
                return {
                    error: item.error
                };
            } else {
                return {};
            }
        }, (item) => {
            return {
                email: item.email,
                telefono: item.phoneNumber,
                keyApi: CoreService.apiKey
            }
        })
        .catch((error) => { reject(error) })
        .then((result) => {  
            resolve(result);
            /*const jsonValue = JSON.stringify(result);
            AsyncStorage
                .setItem('@UserData', jsonValue)
                .then(() => {
                    resolve(result);
                });

            */
        });
    });
}


const login = (body) => {
    return new Promise((resolve, reject) => { 
        return CoreService.post({
            url: CoreService.userUrl,
            pathParams: {
                path: 'login'
            },
            params: null,
            headers: null,
            body: body
        }, (item) => {
            if(item.error) {
                return {
                    error: item.error
                };
            } else {
                return {
                    name: item.nombres,
                    lastname: item.apellidos,
                    hash: item.hash,
                    tokenApi: item.tokenApi
                };
            }
        }, (item) => {
            return {
                telefono: item.phoneNumber,
                codigo: item.code
            }
        })
        .catch(error => reject(error))
        .then((result) => {  
            const jsonValue = JSON.stringify(result);
            AsyncStorage
                .setItem('@UserData', jsonValue)
                .then(() => {
                    resolve(result);
                });
        });
    });

}

const logout = () => {
    return new Promise((resolve, reject) => { 

    AsyncStorage
        .getItem('@UserData')
        .then((jsonValue) => { 
            const userData = jsonValue && JSON.parse(jsonValue);

            if(userData) {
                return CoreService.post({
                    url: CoreService.userUrl,
                    pathParams: {
                        path: 'logout'
                    },
                    params: null,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: null
                }, (item) => {
                    if(item.error) {
                        return {
                            error: item.error
                        };
                    } else {
                        return {};
                    }
                }, (item) => {
                    return {}
                })
                .catch(error => reject(error))
                .then((result) => resolve(result));
            }
        });
    });

}

const LoginService = {
    validatePhone,
    login,
    logout
};



export default LoginService;