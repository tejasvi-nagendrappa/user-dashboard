import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import { DashBoardContext } from '../DashBoard';
import {
  UPDATE_USER_DETAILS, USER_ROLES,
} from '../../utils/AppConstants';
import './EditRow.scss';
import DropDown from '../DropDown';

const propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  toggleEditMode: PropTypes.func.isRequired,
}

const EditRow = ({ rowData, toggleEditMode }) => {
  const [rowState, updateRowState] = useState(rowData);
  const dispatch = useContext(DashBoardContext);

  const { name, email, role, id } = rowState;

  const updateChanges = (key, evt) => {
    const { target: { value = '' } } = evt;
    updateRowState({
      ...rowState,
      [key]: value
    });
  }

  const onNameChange = (evt) => {
    updateChanges('name', evt);
  }

  const onEmailChange = (evt) => {
    updateChanges('email', evt);
  }

  const onRoleChange = (evt) => {
    updateChanges('role', evt);
  }

  const saveUserDetails = () => {
    toggleEditMode();
    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: {
        userData: rowState,
      }
    })
  }

  return (

    <div className="EditRow">
      <div></div>
      <Input
        value={name}
        onValueChange={onNameChange}
        className="EditRow__input"
      />
      <Input
        value={email}
        onValueChange={onEmailChange}
        className="EditRow__input"
      />
      <DropDown
        onValueChange={onRoleChange}
        selectedValue={role}
        options={USER_ROLES}
        className="EditRow__input"
        identifier={id}
      />

      <div className="EditRow__btnGroup">
        <Button
          buttonText="Cancel"
          onButtonClick={toggleEditMode}
          className="EditRow__btn"
        />
        <Button
          buttonText="Save"
          onButtonClick={saveUserDetails}
          className="EditRow__btn"
        />
      </div>
    </div>
  )
}

EditRow.propTypes = propTypes;
export default EditRow;
