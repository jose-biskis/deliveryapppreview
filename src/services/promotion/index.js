import {default as CoreService } from '../core/index';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        CoreService.getItems({
            url: CoreService.promotionUrl,
            p,
            rpp,
            query,
            params,
            headers: null
        }, (item) => {
            return {
                id: item.id,
                name: item.nombre,
                startDate: item.fechaInicio,
                endDate: item.fechaFin,
                type: item.tipoPromocionId,
                amount: item.promoDesc,
                description: item.descripcion,
                imageUrl: { 
                    uri: item.urlImgApp 
                }
            }
        })
        .catch((error) => { reject(error) })
        .then((result) => { resolve(result)});
    });


};

const PromotionService = {
    getItems
};



export default PromotionService;