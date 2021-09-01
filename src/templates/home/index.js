import React from 'react';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { FixedMenuButton, VerticalSeparator } from '_atoms';
import { SquareList, Carousel, OrderList, OrderModal } from '_organisms';
import { SafeAreaView, View, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native';
import styles from './style';

const HomeTemplate = (props) => {
    let components = [];

    components.push((
        <View
            style={styles.sectionContainer}

        >
            { props.promotions && props.promotions.length > 0 &&
            <Carousel
                title="Promociones"
                style="slides"
                itemsPerInterval={1}
                items={props.promotions}
                itemsToShow={props.promotionsToShow}
                hasShowMore={ props.promotionsHasShowMore }
                onShowMore={ () => props.onShowMore('promotion') }
                onPressItem={props.onPressPromotion}
            />     
            } 
        </View>
    ));
    if(props.orders.length > 0) {
        components.push((
            <View
                style={styles.sectionContainer}
            >
                <OrderList 
                    title="Pedidos activos"
                    itemsToShow= { null }
                    displayType='home'
                    items= { props.orders }
                    onSelectOrder={props.onSelectOrder }
                />
            </View>
        ));
    }

    if(!props.isCategoriesLoading) {
        components.push((
            <View
            style={styles.sectionContainer}
        >
            <SquareList 
                onEndReached={  props.onCategoriesEndReached}
                title="Categorias"
                aspectRatio={100/20}
                itemsPerRow={1}
                hasSubtitle={false}
                itemsToShow= { props.categoriesToShow }
                hasShowMore={ props.categoriesHasShowMore }
                items= { props.categories }
                onPressItem={props.onPressCategory}
                onShowMore={ () => props.onShowMore('category') }
            />
        </View> 
        ));
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                backgroundColor='rgba(249,22,116,1)' 
                translucent={true} 
                barStyle='light-content'/>
            <HeaderBar hasShoppingCart={true} addresses={props.addresses} hasBack={props.hasBack} onNavigateBack={props.onNavigateBack} />
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
            <FlatList
                showsVerticalScrollIndicator={false}
                style= { styles.list }
                data={components}
                keyExtractor={(item, index) => index.toString() }
                renderItem={({ item }) =>  item  }
            />
            <OrderModal 
                    order={props.selectedOrder}
                    onModalClose={props.onModalClose}
                    isModalVisible={props.isModalVisible}
                /> 
        </SafeAreaView>
    );
}

export default HomeTemplate;