import React, { useState, useEffect } from 'react';
import { HomeFilterTemplate } from '_templates';
import { StoreService, ProductService } from '_services';

const HomeFilter = ({ route, navigation }) => {
    const [search, setSearch] = useState(null);
    const [stores, setStores] = useState(null);
    const [products, setProducts] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isProductResolved, setIsProductResolved] = useState(true);
    const [isStoreResolved, setIsStoreResolved] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if(isSubscribed && isProductResolved && isStoreResolved) {
            setIsLoading(false);
        }
    }, [isProductResolved, isStoreResolved])
    
    const onSearch = (value) => {
        setSearch(value); 
    }

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    useEffect(() => {
        const unsubscribe = navigation
                                .addListener('blur', () => {
                                    setIsSubscribed(false);
                                    setIsProductResolved(true);
                                    setIsStoreResolved(true);
                                    setIsLoading(true);
                                    setStores(null);
                                    setProducts(null);
                                    setSearch(null);
                                });

        const unsubscribeFocus = navigation
                                .addListener('focus', () => { 
                                    setIsSubscribed(true);                                
                                    setIsProductResolved(false);
                                    setIsStoreResolved(false);  
                                    console.log(route.params);  
                                    if(route.params) {        
                                        setSearch(route.params.search);
                                    }
                                    
                                });
        return () => {
            unsubscribe();
            unsubscribeFocus();
        };
    }, [route.params, navigation]);

    useEffect(() => {
        if(isSubscribed) {
            StoreService
            .getItems({
                p: 1,
                rpp: null,
                query: search,
                params: null
            })
            .catch(error =>  {
                setIsStoreResolved(true);
                console.log('Error:', error);
             })
            .then(response => {
                if(isSubscribed) {
                    if(response && response.data) {
                        setStores(response.data);
                    }
                    setIsStoreResolved(true);
                }
            });
        }
    }, [search]);

    useEffect(() => {
        if(isSubscribed) {
            ProductService
            .getItems({
                p: 1,
                rpp: null,
                query: search,
                params: null
            })
            .catch(error => {
                setIsProductResolved(true);
                console.log('Error:', error);
            })
            .then(response => {
                //console.log(response);
                if(isSubscribed) {
                    if(response && response.data) {
                        setProducts(response.data)
                    }
                    setIsProductResolved(true);
                }
            });
        }
    }, [search]);

    const onPressStore = (store) => {
        navigation.navigate('Product', {
            parentType: 'section',
            store,
            parent: null
        })
    };

    const onSelectProduct = (product) => {   
        setModalVisible(true);
        setSelectedProduct(product);
    } 

    const onModalClose = () => {     
        setModalVisible(!modalVisible);   
        setSelectedProduct(null); 
    }

    return (      
        <HomeFilterTemplate 
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            search={search}
            isLoading={isLoading}
            onSearch={onSearch}
            storesToShow={null}
            stores={stores}
            productsToShow={null}
            products={products}
            onPressMenuButton={onPressMenuButton}
            onPressStore={onPressStore}
            isModalVisible={modalVisible}
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
            onModalClose={onModalClose}
        />
    );
}

export default HomeFilter;
