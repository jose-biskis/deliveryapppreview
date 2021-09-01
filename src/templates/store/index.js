import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { SquareList } from '_organisms';
import styles from './style';
import { VerticalSeparator } from '_atoms';

const StoreTemplate = (props) => {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar 
            backgroundColor='rgba(249,22,116,1)' 
            translucent={true} 
            barStyle='light-content'/>
            <HeaderBar  hasShoppingCart={true} hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
            <View style={{
                marginBottom: 10
            }}>
                <CustomSearchBar onSearch={props.onSearch} search={props.search} />
            </View>
            <View
                style={{ 
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                <VerticalSeparator opacity={0.5} />
            </View>
            <View
                style={styles.sectionContainer}
            >
                <SquareList 
                    title="Tiendas"
                    isLoading={props.isLoading}
                    itemsToShow= { props.storesToShow }
                    items= { props.stores }
                    onPressItem={props.onPressStore}
                    onEndReached={props.onEndReached}
                />
            </View>
        </SafeAreaView>
    );
};

export default StoreTemplate;