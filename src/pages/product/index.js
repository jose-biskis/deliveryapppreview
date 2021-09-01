import React, {useState, useEffect} from 'react';
import { ProductTemplate } from '_templates';
import { ProductService, PromotionService, SectionService } from '_services';
import { usePaginationList } from '_utils';

const Product = ({ route, navigation }) => {
    const storeId = route.params && route.params.store && route.params.store.id;
    const parentType = route.params && route.params.parentType;

    const [products, executeProductAction, productListContext] = usePaginationList({ 
        rpp: 20,
        service: ProductService
    });
    const [sections, executeSectionAction] = usePaginationList({ 
        rpp: 20,
        service: parentType == 'promotion' ? PromotionService : SectionService,
        callback: (response, items) => {
            if(items && items.length > 0) {
                let newSections = [...items, ...response.data];
    
                newSections = newSections.map((item) => {
                    item.isCurrent = item.id == (parentId || 0);
                    return item;
                });

                return newSections;
            } else {
                if(response.data.length > 0) {
                    let newSections = [...[
                        {
                            id: 0,
                            name: "Todos",
                        }
                    ], ...response.data];
        
                    newSections = newSections.map((item) => {
                        item.isCurrent = item.id == (parentId || 0);
                        return item;
                    });

                    return newSections;
                } else {
                    return response.data;
                }
            }
        }
    });

    const [ parentId, setParentId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onSearch = (value) => {
        executeProductAction({action:'SEARCH', value});
    }

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    const setSectionsParams = () => {
        let params = {};
                                    
        if(parentType == 'section') {
            params = {
                parentId: storeId
            };
        }

        executeSectionAction({action:'RESET'});
        executeSectionAction({action:'SET_PARAMS', value: params});  
    }

    const setProductsParams = (sectionParentId) => {
        let params = {};

        if(sectionParentId) {
            params.parentId = sectionParentId;
        }

        if(storeId) {
            params.storeId = storeId;
        }

        switch(parentType) {
            case 'promotion':
                params.parentType = 'promocion';
                break;
            case 'section':
            default:
                params.parentType = 'seccion';
                break;
        }
        
        executeProductAction({action:'RESET', value: {
            search: productListContext.search
        }});
        executeProductAction({action:'SET_PARAMS', value: params});  
    }


    useEffect(() => {
        const unsubscribe = navigation
                                .addListener('blur', () => {
                                    executeProductAction({action: 'CLEAR'});
                                    executeSectionAction({action: 'CLEAR'});
                                    setParentId(null);
                                });

        const unsubscribeFocus = navigation
                                .addListener('focus', () => {
                                    setSectionsParams();
                                    setParentId((route.params && route.params.parent) ? route.params.parent.id : 0);      
                                });
    

        
        return () => {
            unsubscribe();
            unsubscribeFocus();
        };
    }, [route.params, navigation]); 

    useEffect(() => {
        if(parentId != null) {
            setProductsParams(parentId);
        }
    }, [parentId]);



    const onSelectSection = (section) => {
        const newSections = sections.map((item) => {
            item.isCurrent = item.id == section.id;
            return item;
        });

        
        setParentId(section.id);
        executeSectionAction({action:'SET_ITEMS', value: newSections});
    }



    const onSelectProduct = (product) => {
        setModalVisible(true);
        setSelectedProduct(product);
    } 

    const onModalClose = () => {
        setModalVisible(!modalVisible);    
        setSelectedProduct(null);
    }

    return (      
        <ProductTemplate 
            isProductsLoading={productListContext && productListContext.isLoading}
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            onSelectSection={onSelectSection}
            search={productListContext && productListContext.search}
            onSearch={onSearch}
            products={products}
            sections={sections}
            onPressMenuButton={onPressMenuButton}
            isModalVisible={modalVisible}
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
            onModalClose={onModalClose}
            onProductEndReached={() => executeProductAction({action: 'NEXT_PAGE'}) }
            onSectionEndReached={() => executeSectionAction({action: 'NEXT_PAGE'}) }

        />
    );
}

export default Product;
