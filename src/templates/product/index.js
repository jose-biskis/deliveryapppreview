import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { CustomSearchBar, HeaderBar } from '_molecules';
import { ProductList, SectionList, ProductModal } from '_organisms';
import styles from './style';
import { FixedMenuButton, VerticalSeparator } from '_atoms';

const ProductTemplate = (props) => {
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
                props.sections && props.sections.length > 0 &&
                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        alignSelf: "flex-start",
                        minHeight: 50,
                        height: 50
                    }}
                >
                    <SectionList
                        items={props.sections}
                        onSelectItem={props.onSelectSection}
                        onEndReached={props.onSectionEndReached}
                    />
                </View>
            }
            <View
                style={styles.sectionContainer}
            >
                <ProductList 
                    isLoading={props.isProductsLoading}
                    itemsToShow= { null }
                    items= { props.products }
                    onSelectProduct={props.onSelectProduct }
                    onEndReached={props.onProductEndReached}
                />
            </View>
            <ProductModal 
                    product={props.selectedProduct}
                    onModalClose={props.onModalClose}
                    isModalVisible={props.isModalVisible}
                /> 
        </SafeAreaView>
    );
};

export default ProductTemplate;