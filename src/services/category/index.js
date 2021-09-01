import {default as CoreService } from '../core/index';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        CoreService.getItems({
            url: CoreService.categoryUrl,
            p,
            rpp,
            query,
            params,
            headers: null
        }, (item) => {
            return {
                id: item.id,
                name: item.nombre,
                imageUrl: { 
                    uri: item.urlImgApp 
                }
            }
        })
        .catch((error) => { reject(error) })
        .then((result) => { resolve(result)});
    });
};

const CategoryService = {
    getItems
};



export default CategoryService;