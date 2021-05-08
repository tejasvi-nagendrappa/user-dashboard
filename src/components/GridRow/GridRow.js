import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ViewRow from '../ViewRow';
import EditRow from '../EditRow';

const propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

const GridRow = ({ rowData, isRowChecked, onRowSelect }) => {

  const [isRowInEditMode, setstate] = useState(false);

  const toggleEditMode = () => {
    setstate(!isRowInEditMode);
  }
  const getRowInEditMode = () => {
    return (
      <EditRow
        rowData={rowData}
        toggleEditMode={toggleEditMode}
      />
    )
  }

  const getRowInViewMode = () => {
    return (
      <ViewRow
        rowData={rowData}
        toggleEditMode={toggleEditMode}
        isRowChecked={isRowChecked}
        onRowSelect={onRowSelect}
        className={isRowChecked
          ? 'ViewRow ViewRow--selected'
          : 'ViewRow'}
      />
    )
  }

  return (
    <div className="GridRow">
      {
        isRowInEditMode
          ? getRowInEditMode()
          : getRowInViewMode()
      }
    </div>
  )
};

GridRow.propTypes = propTypes;
export default GridRow;
