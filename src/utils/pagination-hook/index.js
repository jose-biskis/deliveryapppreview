import React, {useEffect, useState, useReducer} from 'react';


const usePaginationList = (data) => {
    const rpp = data.rpp;
    const service = data.service;
    const callback = data.callback;

    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(null);
    const [items, setItems] = useState(null);
    const [params, setParams] = useState( null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [totalPages, setTotalPages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const onNextPage = () => {
        if(page < totalPages) {
            setPage(page + 1);
        }
    }

    const onExecuteAction = (toExecute) => {
        switch(toExecute.action) {
            case 'SET_ITEMS':
                setItems(toExecute.value);
                break;
            case 'NEXT_PAGE':
                onNextPage();
                break;
            case 'CLEAR':
                onClear();
                break;
            case 'RESET':
                onReset(toExecute.value);
                break;
            case 'INITIALIZE':
                onInitialize(toExecute.value);
                break;
            case 'SEARCH':
                setItems(null);
                setPage(1);  
                setTotalPages(1);
                setSearch(toExecute.value);
                break;
            case 'SET_PARAMS':
                setParams(toExecute.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(isSubscribed && page && page > 1) {
            service
           .getItems({
               p: page,
               rpp,
               query: search,
               params
           })
           .catch(error => {
              // console.log('Error:', error);
           })
           .then(response => {
               if(isSubscribed) {
                    if(callback) {
                        if(response && response.data) {
                            
                            setTotalPages(response.lastPage);
                            //setPage(response.currentPage); 
                            let filteredItems = callback(response, items);

                            
                            setItems(filteredItems);                         
                        }
                    } else {
                        if(response && response.data) {
                            setTotalPages(response.lastPage); 
                            //setPage(response.currentPage);  

                            if(items && items.length > 0) {
                                let filteredItems = response.data.filter((element) => {
                                    return !items.some(item => element.id == item.id);
                                });

                                 setItems([...items, ...filteredItems]);
                            } else {
                                 setItems(response.data); 
                            }

                            
                        }
                    }
               }
           });
        }
    }, [page])

    useEffect(() => {
        if(isSubscribed && page && page == 1) {
            setIsLoading(true);
            service
           .getItems({
               p: page,
               rpp,
               query: search,
               params
           })
           .catch(error => {
               //console.log('Error:', error);
               setIsLoading(false);
           })
           .then(response => {
               if(isSubscribed) {
                    if(callback) {
                        if(response && response.data) {
                            
                            setTotalPages(response.lastPage);
                            //setPage(response.currentPage); 
                            let filteredItems = callback(response, items);

                            
                            setItems(filteredItems);                         
                        }
                    } else {
                        if(response && response.data) {
                            setTotalPages(response.lastPage); 
                            //setPage(response.currentPage);  

                            if(items && items.length > 0) {
                                let filteredItems = response.data.filter((element) => {
                                    return !items.some(item => element.id == item.id);
                                });

                                 setItems([...items, ...filteredItems]);
                            } else {
                                 setItems(response.data); 
                            }

                            
                        }
                    }

                    setIsLoading(false);
               }
           });
        }
    }, [search, page, params]);

    // Use when you want to reset a list
    const onReset = (dataParams) => {
        setIsSubscribed(true); 
        setItems(null);
        setSearch(dataParams && dataParams.search);
        setParams(null);
        setPage(1);  
        setTotalPages(1); 
    }

    // Use when a page blurs
    const onClear = () => {
        setIsSubscribed(false);
        setIsLoading(true);
        setItems(null);
        setSearch(null);
        setPage(null);
        setParams(null);
        setTotalPages(null);
    }

    // Use when a page focus
    const onInitialize = (dataParams) => {
        setIsSubscribed(true); 
        setPage(1);  
        setTotalPages(1); 
        setParams(dataParams); 
    }

    return [
        items,
        onExecuteAction,
        {
            search,
            isLoading
        }
    ];
}

export default usePaginationList;
