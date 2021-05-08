import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { DashBoardContext } from '../DashBoard';
import { DELETE_USERS } from '../../utils/AppConstants';
import './ViewRow.scss';


const propTypes = {
  isRowHeader: PropTypes.bool,
  className: PropTypes.string,
  rowData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  toggleEditMode: PropTypes.func,
};

const defaultProps = {
  className: 'ViewRow',
  isRowHeader: false,
  toggleEditMode: () => null,
}

const ViewRow = ({
  rowData,
  className,
  toggleEditMode,
  isRowHeader,
  isRowChecked,
  onSelectAll,
  onRowSelect,
}) => {
  const dispatch = useContext(DashBoardContext)
  const { id, name, email, role } = rowData;
  const uniqKey = `ViewRow-${id}`;

  const getColumn = (value) => {
    return (
      <div className="ViewRow__column">
        {value}
      </div>
    );
  }

  const updateState = (val) => {
    if (isRowHeader) {
      onSelectAll(val);
    } else {
      onRowSelect(val, id);
    }
  }

  const deleteUser = () => {
    dispatch({
      type: DELETE_USERS,
      payload: {
        ids: [id],
      }
    })
  }

  return (
    <div
      className={className}
      key={uniqKey}
    >
      <Checkbox
        onClick={updateState}
        checked={isRowChecked}
      />
      {getColumn(name)}
      {getColumn(email)}
      {getColumn(role)}
      {isRowHeader ?
        getColumn("ACTIONS")
        :
        <div className="ViewRow__btnGroup">
          <Button
            buttonText="Edit"
            className="ViewRow__btn"
            onClick={toggleEditMode}
          />
          <Button
            buttonText="Delete"
            className="ViewRow__btn"
            onClick={deleteUser}
          />
        </div>
      }
    </div>
  )
}

ViewRow.propTypes = propTypes;
ViewRow.defaultProps = defaultProps;

export default ViewRow;
