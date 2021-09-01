import React, { useState, useEffect } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import styles from './style';

const CustomSearchBar = (props) => {
    let self;
    const [search, setSearch] = useState(null);



    const onClear = () => {
        setSearch("");
        self.clear();
        props.onSearch("");
    } 
/*
    useEffect(() => {
      setSearch(props.search);
     // self.focus();
    }, [props.search]);
*/
    return (
        <SearchBar
          placeholder= "Buscar locales en esta area"
          ref={ value => self = value}
          containerStyle={ styles.containerStyle }
          inputContainerStyle= { styles.inputContainerStyle }
          rightIconContainerStyle= { styles.rightIconContainerStyle }
          leftIconContainerStyle= { styles.leftIconContainerStyle }
          clearIcon = {  
            <Icon
                onPress = { onClear } 
                type = 'material'
                name = 'clear'
                iconStyle = { styles.iconStyle }
            />
          }
          inputStyle = { styles.fontStyle }
          searchIcon = {
            <Icon
                onPress = { () => {
                  props.onSearch(search)
                  setSearch("");      
                }} 
                type = 'material'
                name = 'search'
                iconStyle = { styles.iconStyle }
            />
          }
          onChangeText={setSearch}
          value={search}
        />
      );
};

export default CustomSearchBar;
