import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Input from '../Input';

const propTypes = {
  onSearchTextChange: PropTypes.func,
}

const defaultProps = {
  onSearchTextChange: () => null,
};

const Search = ({ onSearchTextChange, ...restProps }) => {
  const [searchText, updateSearchText] = useState('');

  const debouncedSearch = useCallback(
    debounce(
      searchVal => onSearchTextChange(searchVal),
      500
    ),
    []
  );

  const onValueChange = (evt) => {
    const { target: { value = '' } } = evt;
    updateSearchText(value);
    debouncedSearch(value);
  };

  return (
    <Input
      onValueChange={onValueChange}
      value={searchText}
      {...restProps}
    />
  );
}
Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
