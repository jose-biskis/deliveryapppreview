import React, {useRef, useEffect} from 'react';
import { Platform, StatusBar, View, KeyboardAvoidingView, Animated, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SigninForm, TermsModal } from '_organisms';
import Logo from "_assets/logo.svg";
import styles from "./style";

const icon = require("_assets/icon.png");

const SignupTemplate = (props) => {
    const onExclusiveSignin = props.onExclusiveSignin;
    const step = props.step;
    const setNextStep = props.setNextStep;
    const flexGrow = 1;
    const flexGrowBig = 4;
    const logoSize = 200;
    const logoSizeSmall = 100;
    const sizeAnim = useRef(new Animated.Value(logoSize)).current;
    const flexGrowAnim = useRef(new Animated.Value(flexGrow)).current;

    
    
    const keyboardDidShow = (event) => {
        Animated.parallel([
            Animated.timing(sizeAnim, {
                duration: event.duration,
                toValue: logoSizeSmall,
                useNativeDriver: false
            }),
            Animated.timing(flexGrowAnim, {
                duration: event.duration,
                toValue: flexGrowBig,
                useNativeDriver: false
            })  
        ])
        .start();
      };
    
    const keyboardDidHide = (event) => {
        Animated.parallel([
            Animated.timing(sizeAnim, {
                duration: event.duration,
                toValue: logoSize,
                useNativeDriver: false
            }),
            Animated.timing(flexGrowAnim, {
                duration: event.duration,
                toValue: flexGrow,
                useNativeDriver: false
            })  
        ])
        .start();
      };

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}>
            <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
            <LinearGradient
            colors={['rgba(255,222,72,1)', 'rgba(249,22,116,1)']}
            style={{ paddingTop: 15, flex: 1 }}
            >
                <View style={ {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',                       
                        flex: 1
                    } }>
                    <Animated.View 
                    style={ { width:"60%", height:"60%"}}>
                        <Logo 
                            width="100%"
                            height="100%"
                        />
                    </Animated.View>
                </View>
                {/* <Animated.View style={ { flexGrow: flexGrowAnim } }> */}
                    <View style={ {
                            flexDirection: 'column',
                            height: 'auto',
                          //  flex: 1,
                          //  flexBasis: "auto",
                            justifyContent: "flex-end"
                        } }>
                        { step && <SigninForm step={ step } onNextStep={ setNextStep } onExclusiveSignin={onExclusiveSignin} hasExclusiveSignin={true}/> }
                    </View>
               {/* </Animated.View> */} 
            </LinearGradient>
            <TermsModal 
                isModalVisible={props.isModalVisible}
                onModalClose={props.onModalClose}
                onContinue={props.onContinue}
                onCancel={props.onCancel}
                isInternalSignup={false}
            />
        </KeyboardAvoidingView>
    )
};

export default SignupTemplate; 