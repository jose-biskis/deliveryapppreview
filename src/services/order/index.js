import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';


const post = (body) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.post({
                    url: CoreService.orderUrl,
                    pathParams: null,
                    params: null,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: body
                }, (item) => {
                    if(item && item.length > 0 && item[0].error) {
                        return {
                            error: item[0].error
                        }
                    } else {
                        return {
                            id: item.id
                        }
                    }
                }, (item) => {
                    return {
                        detalle: item.brief,
                        cuponId: item.couponId,
                        metodoPagoId: item.paymentMethodId,
                        direccionId: item.addressId,
                        tiempoEntregaId: item.deliveryTimeId,
                        productos: item.products.map((product) => {
                            return {
                                id: product.id,
                                cantidad: product.quantity
                            };
                        })
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { resolve(result)});
            });
    });
}

const getItems = ({ p, rpp, query, params}) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                if(userData) {
                    CoreService.getItems({
                        url: CoreService.orderUrl,
                        p,
                        rpp,
                        query,
                        params,
                        headers: {
                            'tokenApi': userData.tokenApi,
                            'Key': userData.hash
                        }
                    }, (item) => {
                        let result = {
                            id: item.id,
                            totalPrice: item.precioTotal,
                            subtotal: item.subTotal,
                            tax: item.impuesto,
                            deliveryCost: item.precioEnvio,
                            creationDate: item.fechaCreacion,
                            brief: item.detalle,
                            addressId: item.direccionId,
                            statusId: item.estadoId,
                            deliveryDate: item.fechaEntrega,
                            lastUpdate: item.ultimaActualizacion,
                            deliveryCounterTime: item.tiempoEnvio,
                        }
                        
                        if(item.estadoPedido) {
                            const orderStatus = item.estadoPedido;
                            result.status = {
                                id: orderStatus.id,
                                name: orderStatus.nombre,
                            }                     
                        }
                        if(item.cupon) {
                            const coupon = item.cupon;
                            result.coupon = {
                                id: coupon.id,
                                name: coupon.nombre,
                                couponTypeId: coupon.tipoCuponId,
                                storeId: coupon.tiendaId,
                                redeemableAmount: coupon.cantidadRedimible,
                                endDate: coupon.fechaCaduca,
                                discount: coupon.descuento
                            }
                        }
                        if(item.tiempoEntrega) {
                            const deliveryTime = item.tiempoEntrega;
                            result.deliveryTime = {
                                deliveryTypeId: deliveryTime.tipoEntregaId,
                                name: deliveryTime.nombre,
                                date: deliveryTime.fecha,
                                id: deliveryTime.id,
                                interval: deliveryTime.intervalo
                            }
                        }
                        if(item.productos) {
                            result.products = item.productos.map((product) => {
                                let response = {
                                    id: product.id,
                                    name: product.titulo,
                                    description: product.detalle,
                                    price: product.precio,
                                    storeId: product.tiendaId,
                                    quantity: product.cantidad,
                                    imageUrl: {
                                        uri: product.urlImg
                                    }
                                }
                
                                if(product.promocion) {
                                    response.promotion = {
                                        type: product.promocion.tipo,
                                        amount: product.promocion.monto,
                                        description: product.promocion.descripcion
                                    };
                                }
                                return response
                            });
                        }
    
                        
    
                        return result;
                    })
                    .catch((error) => { reject(error) })
                    .then((result) => { resolve(result)});
                }


            });
    });


};

const OrderService = {
    post,
    getItems
};



export default OrderService;