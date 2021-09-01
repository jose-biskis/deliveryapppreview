import { SplashScreen } from 'expo';
import React, { useState, useEffect } from 'react';
import { ProfileService } from '_services';
import AsyncStorage from '@react-native-community/async-storage';

const useSplashScreen = (setIsStepperComplete, dispatch) => {
    const [isReady, setIsReady] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(true);

    useEffect(() => {
        SplashScreen.hide();

        if(isSubscribed) {
          AsyncStorage
          .getItem('@UserData')
          .then((jsonValue) => { 
              const userData = jsonValue && JSON.parse(jsonValue);

              if(userData) {
                  ProfileService
                  .getItem()
                  .catch(error => {
                      if(isSubscribed) {
                        setIsReady(true);
                      }
                  })
                  .then(response => {
                      if(isSubscribed) {
                          if(!response.error && response.email) {
                              dispatch({type: 'SET_PROFILE', profile: response});
                              setIsStepperComplete(true);
                          }
                          setIsReady(true);
                      }
                      
                  });
              } else {
                if(isSubscribed) {
                  setIsReady(true);
                }
              }
          });
        }

        return () => {
            setIsSubscribed(false);
        };
    });
    return [isReady];
}

export default useSplashScreen;