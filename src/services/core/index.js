// const baseUrl = 'http://192.168.0.103/api';
// const baseUrl = 'https://dev.tupedido.co/api';
const baseUrl = 'https://tupedido.co/api';


const categoryUrl = `${baseUrl}/categorias`;
const storeUrl = `${baseUrl}/tiendas`;
const productUrl = `${baseUrl}/productos`;
const sectionUrl = `${baseUrl}/secciones`;
const promotionUrl = `${baseUrl}/promociones`;
const profileUrl = `${baseUrl}/perfil`;
const addressUrl = `${baseUrl}/direcciones`;
const deliveryTimeUrl = `${baseUrl}/tiempo-entrega`;
const couponUrl = `${baseUrl}/cupones`;
const orderUrl = `${baseUrl}/pedidos`;

const userUrl = `${baseUrl}/usuario`;

const businessRegisterUrl = `${baseUrl}/atencion-cliente`;
const helpCenterUrl = `${baseUrl}/atencion-cliente`;

const defaultRowsPerPage = 100;
const defaultPage = 1;
const tokenApi = '$2y$10$sCD6gXUHQluBfEzC62sOkuGR9M/mOXz.G7pP0TaJMMV.xmPRM6n/y';
const apiKey = '$2y$10$SdNWIX2J/2/W7uOXjOA/2e7mz/t/YEIhdZ2wk2kvSJhCJftvs6Pay';
const ContentType = 'application/json';

let userData = {
    apiKey,
    hash: '',
    tokenApi: ''
}

const defaultHeaders = {
    'apiKey' : apiKey,
    'Content-Type' : ContentType
}

const buildGetItemsRequest = ({ url, p, rpp, params, query, headers}) => {
    let queryString = '';
    rpp = rpp || defaultRowsPerPage;
    p = p || defaultPage;

    if(p) {
        queryString += `page=${p}`;
    }

    if(rpp) {
        queryString += `&rowsPerPage=${rpp}`;
    }

    if(query) {
        queryString += `&q=${query}`;
    }

    if(params) {
        for(let key in params) {
            queryString += `&${key}=${params[key]}`;
        }
    }

    const request = {
        method: 'GET',
        headers: headers ? {...defaultHeaders, ...headers}  : defaultHeaders,
    };
    const resultUrl = `${url}${ queryString ? '?'+ queryString : ''}`;

    return {
        request,
        url: resultUrl
    };
}

const buildGetItemRequest = ({ url, pathParams, params, headers}) => {
    let queryString = '';
    let path = '';

    if(pathParams) {
        const items = pathParams.items;
        path = pathParams.path;

        for(let key in items) {
            const itemValue = items[key];
            path = path.replace(`{${key}}`, itemValue);
        }
    }

    if(params) {
        for(let key in params) {
            if(queryString) {
                queryString += `&${key}=${params[key]}`;
            } else {
                queryString += `${key}=${params[key]}`;
            }
        }
    }

    const request = {
        method: 'GET',
        headers: headers ? {...defaultHeaders, ...headers}  : defaultHeaders,
    };
    const resultUrl = `${url}${ path ? '/'+ path : '' }${ queryString ? '?'+ queryString : ''}`;

    return {
        request,
        url: resultUrl
    };
}

const buildPutRequest = ({ url, pathParams, params, headers, body}, converterToCallback) => {
    let queryString = '';
    let path = '';

    if(pathParams) {
        const items = pathParams.items;
        path = pathParams.path;

        for(let key in items) {
            const itemValue = items[key];
            path = path.replace(`{${key}}`, itemValue);
        }
    }

    if(params) {
        for(let key in params) {
            queryString += `&${key}=${params[key]}`;
        }
    }

    const request = {
        method: 'PUT',
        headers: headers ? {...defaultHeaders, ...headers}  : defaultHeaders,
        body: JSON.stringify(converterToCallback(body))
    };
    const resultUrl = `${url}${ path ? '/'+ path : '' }${ queryString ? '?'+ queryString : ''}`;

    return {
        request,
        url: resultUrl
    };
}

const buildPostRequest = ({ url, pathParams, params, headers, body}, converterToCallback) => {
    let queryString = '';
    let path = '';

    if(pathParams) {
        const items = pathParams.items;
        path = pathParams.path;

        for(let key in items) {
            const itemValue = items[key];
            path = path.replace(`{${key}}`, itemValue);
        }
    }

    if(params) {
        for(let key in params) {
            queryString += `&${key}=${params[key]}`;
        }
    }

    const request = {
        method: 'POST',
        headers: headers ? {...defaultHeaders, ...headers}  : defaultHeaders,
        body: JSON.stringify(converterToCallback(body))
    };
    const resultUrl = `${url}${ path ? '/'+ path : '' }${ queryString ? '?'+ queryString : ''}`;

    return {
        request,
        url: resultUrl
    };
}

const buildDeleteRequest = ({ url, pathParams, params, headers}) => {
    let queryString = '';
    let path = '';

    if(pathParams) {
        const items = pathParams.items;
        path = pathParams.path;

        for(let key in items) {
            const itemValue = items[key];
            path = path.replace(`{${key}}`, itemValue);
        }
    }

    if(params) {
        for(let key in params) {
            queryString += `&${key}=${params[key]}`;
        }
    }

    const request = {
        method: 'DELETE',
        headers: headers ? {...defaultHeaders, ...headers}  : defaultHeaders
    };
    const resultUrl = `${url}${ path ? '/'+ path : '' }${ queryString ? '?'+ queryString : ''}`;

    return {
        request,
        url: resultUrl
    };
}

const getItems = (appRequest, converterCallback) => {
    const { url, request } = buildGetItemsRequest(appRequest);
    // console.log(url, request);
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .catch((error) => { reject(error) })
            .then(response => {
                if(response && response.data) {
                    const newResponse = {
                        currentPage: response.current_page,
                        data: [],
                        firstPageUrl: response.first_page_url,
                        from: response.from,
                        lastPage: response.last_page,
                        lastPageUrl: response.last_page_url,
                        nextPageUrl: response.next_page_url,
                        path: response.path,
                        perPage: response.per_page,
                        prevPageUrl: response.prev_page_url,
                        to: response.to,
                        total: response.total
                    };

                    if(converterCallback) {
                        newResponse.data = response.data.map(converterCallback);
                    }
                    
                    resolve(newResponse);
                }
            });
    });
}

const getItem = (appRequest, converterCallback) => {
    const { url, request } = buildGetItemRequest(appRequest);
    // console.log(url, request, 'getItem');
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .catch((error) => { reject(error) })
            .then(response => {
                if(response) {
                    if(converterCallback) {
                        response = converterCallback(response);
                    }
                    
                    resolve(response);
                }
            });
    });
}

const put = (appRequest, converterCallback, converterToCallback) => {
    const { url, request } = buildPutRequest(appRequest, converterToCallback);
    // console.log(url, request, 'put');
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .catch((error) => { reject(error) })
            .then(response => {
                if(response && response[0]) {
                    let newResponse = null;
                    if(converterCallback) {

                        newResponse = converterCallback(response[0]);
                    }
                    
                    resolve(newResponse || response[0]);
                } else {
                    reject(response);  
                }
            });
    });
}

const post = (appRequest, converterCallback, converterToCallback) => {
    const { url, request } = buildPostRequest(appRequest, converterToCallback);
    // console.log(url, request, 'post');
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .catch((error) => { reject(error) })
            .then(response => {
                // console.log(response, 'post response');
                if(response) {
                   
                    if(converterCallback) {
                        response = converterCallback(response);
                    }
                    
                    resolve(response);
                }
            });
    });
}

const remove = (appRequest) => {
    const { url, request } = buildDeleteRequest(appRequest);
    // console.log(url, request, 'delete');
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .catch((error) => { reject(error) })
            .then(response => { resolve(response) });
    });
}

const CoreService = {
    addressUrl,
    categoryUrl,
    defaultRowsPerPage,
    defaultPage,
    storeUrl,
    productUrl,
    sectionUrl,
    promotionUrl, 
    profileUrl, 
    defaultHeaders,
    tokenApi,
    apiKey,
    getItems,
    getItem,
    put,
    post,
    remove,
    businessRegisterUrl,
    helpCenterUrl,
    userUrl,
    deliveryTimeUrl,
    couponUrl,
    orderUrl
}

export default CoreService;