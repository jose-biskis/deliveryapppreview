import React, {useState} from 'react';
import { HeaderBar } from '_molecules';
import { SquareList, Carousel, OrderList } from '_organisms';
import { SafeAreaView, View, TouchableOpacity, FlatList, StatusBar, ScrollView, TextInput, Text, Image } from 'react-native';
import { ButtonGroup, Input, Button } from 'react-native-elements';
import styles from './style';
import { FixedMenuButton } from '_atoms';

const profileImage = require("../../assets/profile.png");

const HelpCenterTemplate = (props) => {
    return (
        <SafeAreaView style={styles.container}>        
                <StatusBar 
                    backgroundColor='rgba(249,22,116,1)' 
                    translucent={true} 
                    barStyle='light-content'/>
                <HeaderBar
                title="Centro de ayuda"
                subtitle="Indicanos que necesitas"
                hasShoppingCart={props.hasShoppingCart} addresses={props.addresses} hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
                <View 
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignSelf: 'flex-end',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '90%',
                }}>
                    <View style={[
                        styles.sectionContainer,
                    {
                        backgroundColor:'#FFFFFF',
                        elevation: 4,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%',
                        paddingTop: 10,
                    }]}>
                        <ScrollView style={{
                            height: '100%'
                        }}>
                            <ProfileForm 
                                data={props.data}
                                onSubmit={props.onSave}
                            />
                        </ScrollView>
                    </View>        
                </View>
        </SafeAreaView>
    );
}

const ProfileForm = ({onSubmit, data}) => {
    [description, setDescription] = useState("");
    let descriptionRef = null;


    const onPressButton = () => {
        onSubmit({
            description: description
        });
    }

    return (
        <View
        style={ {
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 15,
            width: "100%",
            justifyContent: "flex-end",
            alignSelf: "flex-end"
        } }
        >
            <View 
                style= { {
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    flexGrow: 2
                } }
            >
            <TouchableOpacity
                style={{
                    height: 'auto',
                    width: 'auto'
                }}
                onPress={() => {
                    descriptionRef.focus();
                }}
            > 
            <Input
                ref={value => descriptionRef = value}
                placeholder="Necesito ayuda"
                label="Descripción"
                containerStyle={{
                    marginBottom: 10,
                    paddingLeft:0,
                    paddingRight:0
                }}
                errorStyle={{height: 0, margin: 0}}
                inputStyle= { {
                    color: "black",
                    fontSize: 18,
                    alignSelf: "flex-start"
                } }
                labelStyle= { {
                    color: "black",
                    fontSize: 14,
                    marginBottom: 5
                } }
                inputContainerStyle= { {
                    alignSelf: "flex-start",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10,
                    height: 200
                } }
                multiline={true}
                value={ description }
                onChangeText = { setDescription } 
            />
            </TouchableOpacity>
            </View>
            <Button 
                    raised
                    title="Enviar"
                    onPress={ onPressButton }
                    containerStyle= {  {
                        width: "25%",
                        alignSelf: "center",
                        flexBasis: "auto"
                    } }
                    buttonStyle= {  {
                        backgroundColor: "rgba(249,22,116,1)"
                    } }
                />
        </View>
    );
    
};

export default HelpCenterTemplate;