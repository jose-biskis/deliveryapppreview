import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { BannerList } from '_organisms';
import styles from './style';
import { VerticalSeparator } from '_atoms';

const PromotionTemplate = (props) => {
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
                <BannerList 
                    title="Promociones"
                    itemsToShow= { null }
                    items= { props.promotions }
                    onPressItem={props.onPressPromotion}
                    onEndReached={props.onEndReached}
                    isLoading={props.isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

export default PromotionTemplate;