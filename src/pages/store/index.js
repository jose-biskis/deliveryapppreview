import React, { useState, useEffect } from 'react';
import { StoreTemplate } from '_templates';
import { StoreService } from '_services';
import { usePaginationList } from '_utils';

const Store = ({ route, navigation }) => {
    const [stores, executeAction, context] = usePaginationList({ 
        rpp: 20,
        service: StoreService
    });
    const parentId = route.params.category && route.params.category.id;

    const onSearch = (value) => {
        executeAction({action: 'SEARCH', value});
    }

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    useEffect(() => {
       const unsubscribe = navigation
                                .addListener('blur', () => {
                                    executeAction({action: 'CLEAR'});
                                });

        const unsubscribeFocus = navigation
                                    .addListener('focus', () => {
                                        let params = null;

                                        if(parentId) {
                                            params = {
                                                parentId: parentId
                                            };
                                        }
                                
                                        executeAction({action:'RESET'});
                                        executeAction({action:'SET_PARAMS', value: params});  
                                    });
        return () => {
            unsubscribe();
            unsubscribeFocus();
        };
    }, [route.params, navigation]);

    const onPressStore = (store) => {
        navigation.navigate('Product', {
            parentType: 'section',
            store,
            parent: null
        })
    };

    return (      
        <StoreTemplate 
            isLoading={context && context.isLoading}
            onNavigateBack={() => navigation.goBack()}
            hasBack={true}
            search={context && context.search}
            onSearch={onSearch}
            storesToShow={null}
            stores={stores}
            onPressMenuButton={onPressMenuButton}
            onPressStore={onPressStore}
            onEndReached={() => executeAction({action: 'NEXT_PAGE'}) }
        />
    );
}

export default Store;
