import {default as CoreService } from '../core/index';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => {
        CoreService.getItems({
            url: CoreService.storeUrl,
            p,
            rpp,
            query,
            params,
            headers: null
        }, (item) => {
            return {
                id: item.id,
                name: item.nombre,
                document:  item.documento,
                imageUrl: { 
                    uri: item.urlImg 
                }
            }
        })
        .catch((error) => { reject(error) })
        .then((result) => { resolve(result)});     
    });
};

const StoreService = {
    getItems
};



export default StoreService;