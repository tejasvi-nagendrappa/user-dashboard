import React from 'react';
import PropTypes from 'prop-types';

const onFocus = (evt) => {
  let { target: { value } } = evt;
  const savedVal = value;
  evt.target.value = '';
  evt.target.value = savedVal;
};

const propTypes = {
  onFocus: PropTypes.func,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  onValueChange: () => null,
  placeholder: '',
  value: '',
  onFocus: onFocus,
  type: 'text',
};


const TextAreaInput = ({
  value,
  onValueChange,
  placeholder,
  type,
  ...restProps
}) => {

  return (
    <input
      type={type}
      onChange={onValueChange}
      value={value}
      placeholder={placeholder}
      autoFocus
      {...restProps}
    />
  )
}

TextAreaInput.propTypes = propTypes;
TextAreaInput.defaultProps = defaultProps;

export default TextAreaInput;
