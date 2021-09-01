import React, {useState, useEffect} from 'react';
import { CategoryTemplate } from '_templates';
import { CategoryService } from '_services';
/*
const cata = require("../../assets/cata.png");
const catb = require("../../assets/catb.png");
const catc = require("../../assets/catc.png");
const catd = require("../../assets/catd.png");
*/

const Category = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(true);


    const onSearch = (value) => {
        setSearch(value); 
    }

    
    useEffect(() => {
        setIsSubscribed(true);
        const unsubscribe = navigation
                                .addListener('blur', () => {
                                    setCategories([]);
                                    setSearch(null);
                                    setIsSubscribed(false);
                                });


        return () => { 
            setIsSubscribed(false);
            unsubscribe();
        };
    });

    useEffect(() => {
        if(isSubscribed) {
            CategoryService
            .getItems({
                p: 1,
                rpp: null,
                query: search,
                params: null
            })
            .catch(error => {
                console.log('Error:', error);
            })
            .then(response => {
                if(isSubscribed) {
                    if(response && response.data) {
                        setCategories(response.data);
                    }
                }
            });
        }

    }, [ search, isSubscribed ])
    


    const onPressMenuButton = () => {
        navigation.toggleDrawer();
    }

    const onPressCategory = (category) => {
        navigation.navigate('Store', {
            category
        })
    };

    const addresses = [
        {
            id: '1',
            text: "Calle 87 - 65 - Bomboná",
            isSelected: true
        }, 
        {
            id: '2',
            text: "Calle 97 - 75 - Poblado",
            isSelected: false          
        }
    ];

    return (      
        <CategoryTemplate 
            onNavigateBack={() => {
                navigation.goBack();
            }}
            hasBack={true}
            addresses={addresses}
            onSearch={onSearch}
            categoriesToShow={null}
            categories={categories}
            onPressMenuButton={onPressMenuButton}
            onPressCategory={onPressCategory}
        />
    );
}

export default Category;
