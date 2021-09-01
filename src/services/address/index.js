import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.getItems({
                    url: CoreService.addressUrl,
                    p,
                    rpp,
                    query,
                    params,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    }
                }, (item) => {
                    return {
                        id: item.id,
                        name: item.nombre,
                        longitude: item.longitud,
                        latitude: item.latitud,
                        address: item.direccion,
                        info: item.infoExtra
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
};

const post = (body) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.post({
                    url: CoreService.addressUrl,
                    pathParams: null,
                    params: null,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: body
                }, (item) => {
                    return {
                        id: item.id,
                        name: item.nombre,
                        longitude: item.longitud,
                        latitude: item.latitud,
                        address: item.direccion,
                        info: item.infoExtra 
                    }
                }, (item) => {
                    return {
                        direccion: item.address,
                        nombre: item.name,
                        infoExtra: item.info
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
}

const remove = (id) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.remove({
                    url: CoreService.addressUrl,
                    pathParams: {
                        path: '{id}',
                        items: {
                            id
                        }
                    },
                    params: null,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
}

const PromotionService = {
    getItems,
    post,
    remove
};



export default PromotionService;