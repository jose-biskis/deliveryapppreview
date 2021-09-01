import React from 'react';
import { SafeAreaView, View, StatusBar, FlatList, Text } from 'react-native';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { SquareList, ProductList, ProductModal} from '_organisms';
import styles from './style';
import { VerticalSeparator } from '_atoms';

const HomeFilterTemplate = (props) => {
    let components = [];

    components.push((
        <View
            style={styles.sectionContainer}
        >
            <SquareList 
                title="Tiendas"
                itemsToShow= { props.storesToShow }
                items= { props.stores }
                onPressItem={props.onPressStore}
            />
        </View>
    ));

    components.push((
        <View
            style={styles.sectionContainer}
        >
            <ProductList 
                title= "Productos"
                itemsToShow= { null }
                items= { props.products }
                onSelectProduct={props.onSelectProduct }
            />
        </View>
    ));

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
            {
                !props.isLoading &&
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={components}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => item}
                />
            } 
            {
                props.isLoading && 
                <View style={{
                    marginTop: 10,
                    flex: 2,
                    width: '100%',
                    alignSelf: "center",
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                <Text style={ { fontSize: 20, marginBottom: 10, textAlign: 'left'  }}>Cargando...</Text>

                </View>

            }
            <ProductModal 
                    product={props.selectedProduct}
                    onModalClose={props.onModalClose}
                    isModalVisible={props.isModalVisible}
                /> 
        </SafeAreaView>
    );
};

export default HomeFilterTemplate;