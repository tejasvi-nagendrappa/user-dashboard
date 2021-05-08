import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  onValueChange: () => null,
  options: [],
};

const DropDown = ({
  onValueChange,
  selectedValue,
  options = [],
  ...restProps
}) => {

  const renderOptions = () => {
    return options.map((item) => <option value={item}>{item}</option>);
  }

  return (
    <select
      value={selectedValue}
      onChange={onValueChange}
      {...restProps}
    >
      {renderOptions()}
    </select>
  )

}

DropDown.propTypes = propTypes;
DropDown.defaultProps = defaultProps;

export default DropDown;
