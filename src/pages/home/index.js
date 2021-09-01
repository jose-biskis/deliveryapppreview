import React, {useState, useEffect, useContext} from 'react';
import { HomeTemplate } from '_templates';
import { PromotionService, CategoryService } from '_services';
import { AppContext, usePaginationList } from '_utils';

const Home = ({route, navigation}) => {
    const [categories, executeAction, categoryContext] = usePaginationList({ 
        rpp: 20,
        service: CategoryService
    });

    const { orders } = useContext(AppContext);
    const [search, setSearch] = useState(null);

    const [promotions, setPromotions] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [isPromotionSubscribed, setIsPromotionSubscribed] = useState(true);
    const [promotionTotalPages, setPromotionTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const promotionsToShow = 2;

    const onSearch = (value) => {
        setSearch(value); 
        if(value) {
            navigation.navigate('HomeFilter', {
                category: null,
                search: value
            });
        }

    }
    const onShowMore = (value) => {
        switch(value) {
            case 'order':
                navigation.navigate('Historial de pedidos');
                break;
            case 'promotion':
                navigation.navigate('Promotion');
                break;
            case 'category':
            default:
                navigation.navigate('Category');
                break;
        }
    }

    useEffect(() => {
        const unsubscribe = navigation
                                 .addListener('blur', () => {
                                     executeAction({action: 'CLEAR'});
                                 });
 
         const unsubscribeFocus = navigation
                                     .addListener('focus', () => {
                                        executeAction({action: 'INITIALIZE'});  
                                     });
         return () => {
             unsubscribe();
             unsubscribeFocus();
         };
     }, [route.params, navigation]);

    useEffect(() => {
        setIsSubscribed(true);
        if(isSubscribed && isPromotionSubscribed) {
            PromotionService
            .getItems({
                p: 1,
                rpp: promotionsToShow,
                query: search,
                params: null
            })
            .catch(error => {
                console.log('Error:', error);
                setIsPromotionSubscribed(false);
            })
            .then(response => {
                if(isSubscribed) {
                    if(response && response.data) {
                        setPromotions(response.data);
                        setPromotionTotalPages(response.lastPage);
                    }
                }
                setIsPromotionSubscribed(false);
            });
        }

        return () => (setIsSubscribed(false));
    }, [promotions, isPromotionSubscribed]);

    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    const onPressPromotion = (promotion) => {
        navigation.navigate('Product', {
            parentType: 'promotion',
            store: null,
            parent: promotion
        })
    };

    const onPressCategory = (category) => {
        navigation.navigate('Store', {
            category
        })
    };

    const onSelectOrder = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    } 

    const onModalClose = () => {
        setSelectedOrder(null);
        setModalVisible(!modalVisible);    
    }

    return (
        <HomeTemplate 
            isCategoriesLoading={categoryContext && categoryContext.isLoading}
            isModalVisible={modalVisible}
            selectedOrder={selectedOrder}
            onSelectOrder={onSelectOrder}
            onModalClose={onModalClose}
            onNavigateBack={navigation.back}
            hasBack={false}
            onPressPromotion={onPressPromotion}
            onPressCategory={onPressCategory} 
            search={search}         
            onSearch={onSearch}
            categoriesToShow={null}
            categoriesHasShowMore={false}
            categories={categories}
            promotionsToShow={promotionsToShow}
            promotionsHasShowMore={promotionTotalPages > 1}
            promotions={promotions}
            onShowMore={onShowMore}
            onPressMenuButton={onPressMenuButton}
            orders={orders}
            onCategoriesEndReached={() => executeAction({action: 'NEXT_PAGE'}) }
        />   
    );
}

export default Home;
