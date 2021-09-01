import {default as CoreService } from '../core/index';
import AsyncStorage from '@react-native-community/async-storage';



//TODO: get profile from async storage
const getItem = () => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.getItem({
                    url: CoreService.profileUrl,
                    pathParams: null,
                    params: null,
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
                        let birthdate = null;
    
                        if(item.fechaNacimiento) {
                            const date = new Date(item.fechaNacimiento);
        
                            let year = date.getFullYear();
                            let month = date.getMonth() + 1;
                            let day = date.getDay() + 1;
        
                            month = "00".substr((month).toString().length) + month;
                            day = "00".substr((day).toString().length) + day;
                            /*
                            const year = new Intl
                                                .DateTimeFormat('en', { year: 'numeric', timeZone: 'UTC' })
                                                .format(date)
                            const month = new Intl
                                                .DateTimeFormat('en', { month: 'numeric', timeZone: 'UTC' })
                                                .format(date)
                            const day = new Intl
                                                .DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' })
                                                .format(date)
                            */
            
                            birthdate = `${year}/${month}/${day}`;
                        }
                        const userModel = {
                            name: item.nombres,
                            lastname: item.apellidos,
                            dni: item.numeroIdentificacion,
                            email: item.email,
                            phone: {
                                code: '+57',
                                number: item.telefono,
                            },
                            birthdate: birthdate,
                            gender: item.sexo == 1 ? 'male' : 'female'
                        };
                                  
                        return userModel;
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { 
                    AsyncStorage
                        .setItem('@UserData', JSON.stringify({...userData, ...result}))
                        .then(value => { 
                            resolve(result);
                        });
                    
                });

            });
    });
};

const put =  (body) => {
    return new Promise((resolve, reject) => { 
        AsyncStorage
            .getItem('@UserData')
            .then((jsonValue) => { 
                const userData = jsonValue && JSON.parse(jsonValue);
            
                CoreService.put({
                    url: CoreService.profileUrl,
                    pathParams: null,
                    params: null,
                    headers: {
                        'tokenApi': userData.tokenApi,
                        'Key': userData.hash
                    },
                    body: body
                }, (item) => {
                    if(item.error) {
                        return {
                            error: item.error
                        };
                    } else {
                        let birthdate = null;
            
                        if(item.fechaNacimiento) {
                            const date = new Date(item.fechaNacimiento);
                
                            let year = date.getFullYear();
                            let month = date.getMonth() + 1;
                            let day = date.getDate();
                
                            month = "00".substr((month).toString().length) + month;
                            day = "00".substr((day).toString().length) + day;
                            /*
                            const year = new Intl
                                                .DateTimeFormat('en', { year: 'numeric', timeZone: 'UTC' })
                                                .format(date)
                            const month = new Intl
                                                .DateTimeFormat('en', { month: 'numeric', timeZone: 'UTC' })
                                                .format(date)
                            const day = new Intl
                                                .DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' })
                                                .format(date)
                            */
                
                            birthdate = `${year}/${month}/${day}`;
                        }
                
                        const userModel = {
                            name: item.nombres,
                            lastname: item.apellidos,
                            dni: item.numeroIdentificacion,
                            email: item.email,
                            phone: {
                                code: '+57',
                                number: item.telefono,
                            },
                            birthdate: birthdate,
                            gender: item.sexo == 1 ? 'male' : 'female'
                        };
                
                        return userModel;
                    }
                }, (item) => {
                    return {
                        nombres: item.name,
                        apellidos: item.lastname,
                        numeroIdentificacion: item.dni,
                        email: item.email,
                        telefono: item.telefono,
                        fechaNacimiento: (new Date(item.birthdate)).toISOString(),
                        sexo: item.gender == 'male' ? 1 : 0
                    }
                })
                .catch((error) => { reject(error) })
                .then((result) => { 
                    AsyncStorage
                    .setItem('@UserData', JSON.stringify({...userData, ...result}))
                    .then(value => { 
                        resolve(result);
                    });
                });

            });
    });
}

const ProfileService = {
    getItem,
    put
};



export default ProfileService;