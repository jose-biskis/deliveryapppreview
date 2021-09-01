import React, { useEffect, useState, useContext } from 'react';
import { LoginService, ProfileService } from '_services';
import { Alert } from 'react-native';
import { default as AppContext } from '../app-context/index';

const useStepper = (steps, onSetExternalComplete, onNextStep) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [step, setStep] = useState(null);

    const upStepCallback = (plus) => {
        setCurrentStep(currentStep + (plus || 1));
    }

    const setNextStep = (inputs) => {
        if (currentStep < steps.length) {
            onNextStep(inputs, upStepCallback);
        }
    }

    const onSetComplete = () => {
        setIsComplete(true);
        if(onSetExternalComplete) {
            onSetExternalComplete(true);
        }
    }

    useEffect(() => {
        if(currentStep < steps.length) {
            setStep(steps[currentStep]);
        } else {
            onSetComplete();   
        }
    }, [currentStep])

    return [step, setNextStep, isComplete, upStepCallback];
}

const useSignin = (onComplete, setModalVisible) => {
    const { setProfile } = useContext(AppContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const onNextStep = (inputs, callback) => {
        const currentStep = step.step;
        
        if(currentStep == 1) {
            const constPhoneNumber = inputs.filter((input) => {
                return input.name == "phone";
            })[0].value;

            if(!constPhoneNumber) {
                Alert.alert(
                    "Alerta",
                    "Debe completar todos los  campos",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );           
            } else {
                LoginService
                .validatePhone({
                    phoneNumber: constPhoneNumber,
                    email: ""
                })
                .catch(error => {
                    console.log('Error:', error);
                    if(isSubscribed) {
                        Alert.alert(
                            "Error",
                            "No se ha podido validar el teléfono",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                    }
                })
                .then(response => {
                    if(isSubscribed) {
                        if(response.error) {
                            if(response.error == 'USER_NOT_CREATED') {
                                setPhoneNumber(constPhoneNumber);
                                setModalVisible(true);
                            } else {
                                Alert.alert(
                                    "Error",
                                    "No se ha podido validar el teléfono",
                                    [
                                      { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                );
                            }
                        } else {
                            setPhoneNumber(constPhoneNumber);
                            callback(2);
                        }
                    }
                });
            }
        } 
        if(currentStep == 2) {
            const constPhoneNumber = inputs.filter((input) => {
                return input.name == "phone";
            })[0].value;

            const constEmail = inputs.filter((input) => {
                return input.name == "email";
            })[0].value;

            if(!constPhoneNumber || !constEmail) {
                Alert.alert(
                    "Alerta",
                    "Debe completar todos los  campos",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );           
            } else {
                LoginService
                .validatePhone({
                    phoneNumber: constPhoneNumber,
                    email: constEmail,
                })
                .catch(error => {
                    console.log('Error:', error);
                    if(isSubscribed) {
                        Alert.alert(
                            "Error",
                            "Ha sucedido un error en el proceso",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                    }
                })
                .then(response => {
                    if(isSubscribed) {
                        if(response.error) {
                            Alert.alert(
                                "Error",
                                "Ha sucedido un error en el proceso",
                                [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            setPhoneNumber(constPhoneNumber);
                            setEmail(constEmail);
                            callback();
                        }
                    }
                });
            }
        } 

        if(currentStep == 3) {
            const input = inputs[0];

            if(!input || !input.value || input.value.length < 4) {
                Alert.alert(
                    "Alerta",
                    "Debe completar todos los  campos",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );       
            } else {
                LoginService
                .login({
                    phoneNumber: phoneNumber,
                    code: input.value
                })
                .catch(error => {
                    console.log('Error:', error);
                    if(isSubscribed) {
                        Alert.alert(
                            "Error",
                            "No se ha podido validar el código",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                    }
                })
                .then(response => {
                    console.log('login rresponse:', response);
                    if(isSubscribed) {
                        if(response.error) {
                            Alert.alert(
                                "Error",
                                "No se ha podido validar el código",
                                [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            ProfileService
                            .getItem()
                            .catch(error => {
                                console.log('Error:', error);
                            })
                            .then(result => {
                                if(isSubscribed) {
                                    if(!result.error) {
                                        if(result.name) {
                                            setProfile(result);
                                            onComplete(true);
                                        } else {
                                            callback();
                                        }
                                    } 
                                }
                            });
                        }
                    }
                });

            }
        }
        if(currentStep == 4) {
            const name = inputs.filter((input) => {
                return input.name == "name";
            })[0].value;

            if(!name) {
                Alert.alert(
                    "Alerta",
                    "Debe completar todos los  campos",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            } else {
                ProfileService
                .put({
                    name: name,
                    lastname: "",
                    dni: "",
                    email: "",
                    phone: {
                        code: "",
                        number: "",
                    },
                    birthdate: (new Date()).toISOString(),
                    gender: ""
                })
                .catch(error => {
                    console.log('Error:', error);
                    Alert.alert(
                        "Error",
                        "No se han podido guardar los datos",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                })
                .then(response => {
                    if(isSubscribed) {
                        if(response.error) {
                            Alert.alert(
                                "Error",
                                "No se han podido guardar los datos",
                                [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            setProfile(response);
                            onComplete(true);
                        }
                    }
                });
            }
        }
        
    };

    const [isSubscribed, setIsSubscribed] = useState(true);
    const [step, setNextStep, isComplete, upStepCallback] = useStepper([
        {
            step: 1,
            title: "Ingresa tu número",
            buttonText: "Enviar",
            inputs: [
                {
                    label:"Número telefónico",
                    placeholder: "+570000000000",
                    name: "phone",
                    type: "numeric",
                    value: "",
                    editable: true
                }
            ]
        },
        {
            step: 2,
            title: "Ingresa tu número y correo",
            buttonText: "Enviar",
            inputs: [
                {
                    label:"Número telefónico",
                    placeholder: "+570000000000",
                    name: "phone",
                    type: "numeric",
                    value: phoneNumber,
                    editable: false
                },                
                {
                    label:"Correo electrónico",
                    placeholder: "abc@correo.com",
                    name: "email",
                    value: "",
                    editable: true
                }
            ]
        },
        {
            step: 3,
            title: "Ingresa el código",
            buttonText: "Enviar",
            inputs: [
                {
                    label:"Código",
                    placeholder: "A12345978",
                    name: "code",
                    value: ""
                }
            ]
        },
        {
            step: 4,
            title: "Ingresa tus datos",
            buttonText: "Enviar",
            inputs: [
                {
                    label:"Nombre",
                    placeholder: "Juan",
                    name: "name",
                    value: "",
                    editable: true
                }
            ]
        }
    ], onComplete, onNextStep);

    useEffect(() => {
        setIsSubscribed(true);

        return () => {
            setIsSubscribed(false);
        }
    }); 

    return [step, setNextStep, isComplete, upStepCallback];
};

export default useSignin;

