import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string.isRequired
};

const defaultProps = {
  className: 'MessageContainer'
};

const MessageContainer = ({
  className,
  message,
}) => {
  return (
    <div className={className}>
      {message}
    </div>
  );
}

MessageContainer.propTypes = propTypes;
MessageContainer.defaultProps = defaultProps;

export default MessageContainer;
