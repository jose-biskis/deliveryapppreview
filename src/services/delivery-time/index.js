import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.getItems({
                    url: CoreService.deliveryTimeUrl,
                    p,
                    rpp,
                    query,
                    params,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    }
                }, (item) => {
                    if(item.error) {
                        return {
                            error: item.error
                        }
                    } else {
                        let response = {};
                        if(params) {
                            let date = null;
                            let year = null;
                            let month = null;
                            let day = null;
                            switch(params.getBy) {
                                case 'tipoEntrega':
                                    response = {
                                        deliveryTypeId: item.tipoEntregaId,
                                        name: item.tipoEntregaNombre,
                                    }
                                    break;
                                case 'fecha':
                                    date = new Date();
                                    let today = date.getDay() + 1;
                                    let diff = 0;
                                    if(today > item.diaId) {
                                        diff = (item.diaId + 7) - today;
                                    } else if(today == item.diaId) {
                                        diff = 7;
                                    } else {
                                        diff = (item.diaId - today);
                                    }
                                    
                                    date.setDate(date.getDate() + diff);
                                    day = date.getDate();
                                    month = date.getMonth() + 1;

                                    month = "00".substr((month).toString().length) + month;
                                    day = "00".substr((day).toString().length) + day;

                                    response = {
                                        date: item.diaId,
                                        month,
                                        day
                                    }
                                    break;
                                case 'intervalo':
                                    response = {
                                        deliveryTypeId: item.tipoEntregaId,
                                        name: item.nombre,
                                        date: item.diaId,
                                        id: item.id,
                                        interval: item.intervalo
                                    }
                                    break;
                                default:
                                    response = {};
                                    break;
                            }
                        }
                        return response;
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});

            });
    });
};

const DeliveryTimeService = {
    getItems
};



export default DeliveryTimeService;