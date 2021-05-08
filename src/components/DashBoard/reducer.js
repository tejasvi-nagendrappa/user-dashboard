import {
  DELETE_USERS,
  UPDATE_USER_DETAILS,
  UPDATE_SEARCH_TEXT,
  FETCH_USER_SUCCESS,
} from '../../utils/AppConstants.js';

const updateUserDetails = (state, payload) => {
  const {
    userData,
    userData: { id: userId }
  } = payload;
  const { data } = state;

  const indexOfUser = data.findIndex(({ id }) => {
    return id === userId;
  });

  if (indexOfUser >= 0) {
    let updatedUsers = [...data];
    updatedUsers[indexOfUser] = { ...userData };

    return {
      ...state,
      data: updatedUsers,
    };
  }
}

const deleteUsers = (state, payload) => {
  const { ids = [] } = payload;
  const { data } = state;

  const userAfterDeletion = data.filter(({ id }) => !ids.includes(id));

  return {
    ...state,
    data: userAfterDeletion,
  }
}

const updateSearchText = (state, payload) => {
  const { searchText } = payload;
  return {
    ...state,
    searchText,
  }
}

const addUsersToState = (state, payload) => {
  const { data } = payload;
  return {
    ...state,
    data,
  }
}

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_USER_SUCCESS:
      return addUsersToState(state, payload);
    case UPDATE_USER_DETAILS:
      return updateUserDetails(state, payload);
    case DELETE_USERS:
      return deleteUsers(state, payload);
    case UPDATE_SEARCH_TEXT:
      return updateSearchText(state, payload);
    default:
      return state;
  }
}

export default reducer;
