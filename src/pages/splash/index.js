import React from 'react';
import { SafeAreaView, StatusBar, Image } from 'react-native';
import styles from './style';
import Logo from  "../../assets/logo.svg" ;
import { LinearGradient } from 'expo-linear-gradient';

const icon = require("_assets/icon.png");

const Splash = () => {

    return (
        <SafeAreaView style={styles.container}> 
            <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
            <LinearGradient
            colors={['rgba(255,222,72,1)', 'rgba(249,22,116,1)']}
            style={{ padding: 15, alignItems: 'center', flex:1, justifyContent: 'center'}}>
                <Logo 
                    width={200}
                    height={200}
                />
            </LinearGradient>

        </SafeAreaView>
    );
}

export default Splash;
