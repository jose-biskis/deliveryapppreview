import React, {useState, useEffect} from 'react';
import { PromotionTemplate } from '_templates';
import { PromotionService } from '_services';
import { usePaginationList } from '_utils';

const Promotion = ({ route, navigation }) => {
    const [promotions, executeAction, context] = usePaginationList({ 
        rpp: 20,
        service: PromotionService
    });

    const onSearch = (value) => {
        executeAction({action: 'SEARCH', value});
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

    return (      
        <PromotionTemplate
            isLoading={context && context.isLoading}
            onNavigateBack={() => navigation.goBack()}
            hasBack={true}
            search={context && context.search}
            onSearch={onSearch}
            promotions={promotions}
            onPressMenuButton={onPressMenuButton}
            onPressPromotion={onPressPromotion}
            onEndReached={() => executeAction({action: 'NEXT_PAGE'}) }
        />
    );
}

export default Promotion;
