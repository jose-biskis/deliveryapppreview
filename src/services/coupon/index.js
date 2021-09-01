import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';


const getItem = ({params, pathParams}) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.getItem({
                    url: CoreService.couponUrl,
                    pathParams: pathParams,
                    params: params,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    }
                }, (item) => {
                    if(item.error) {
                        return {
                            error: item.error
                        };
                    } else {
                        return {
                            id: item.id,
                            name: item.nombre,
                            couponTypeId: item.tipoCuponId,
                            storeId: item.tiendaId,
                            redeemableAmount: item.cantidadRedimible,
                            endDate: item.fechaCaduca,
                            discount: item.descuento
                        };
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result) });

            });
    });
};

const CouponService = {
    getItem
};



export default CouponService;