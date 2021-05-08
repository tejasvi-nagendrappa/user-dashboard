import React from 'react';

const Checkbox = ({ onClick, checked = false }) => (
  <input
    onClick={evt => {
      onClick(evt.target.checked)
    }}
    onChange={evt => {
      onClick(evt.target.checked);
    }}
    type="checkbox"
    className="Checkbox"
    checked={checked}
  />
);

export default Checkbox;
