import {default as CoreService } from '../core/index';

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        CoreService.getItems({
            url: CoreService.productUrl,
            p,
            rpp,
            query,
            params,
            headers: null
        }, (item) => {
            let response = {
                id: item.id,
                name: item.titulo,
                description: item.detalle,
                price: item.precio,
                storeId: item.tiendaId,
                unitPrice: item.precioPorUnidad,
                statusId: item.estadoId,
                imageUrl: {
                    uri: item.urlImg
                }
            }

            if(item.tienda) {
                response.store = {
                    id: item.tienda.id,
                    name: item.tienda.nombre,
                    document:  item.tienda.documento,
                    imageUrl: { 
                        uri: item.tienda.urlImg 
                    }
                }  
            }

            if(item.promocion) {
                response.promotion = {
                    type: item.promocion.tipo,
                    amount: item.promocion.monto,
                    description: item.promocion.descripcion
                };
            }
            return response
        })
        .catch((error) => { reject(error) })
        .then((result) => { resolve(result)});
    });
};

const ProductService = {
    getItems
};



export default ProductService;