import React, { useReducer, useEffect, useMemo } from 'react';
import Search from '../Search';
import DataGrid from '../DataGrid';
import {
  initialState,
  UPDATE_SEARCH_TEXT,
  FETCH_USER_SUCCESS,
} from '../../utils/AppConstants';
import getUsersList from './DashBoardActions';
import filterUsers from './DashBoardSelector';
import reducer from './reducer';
import './DashBoard.scss';


const DashBoardContext = React.createContext(null);

const DashBoard = () => {
  const [appState, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { data, searchText } = appState;


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUsersList()
      .then((usersList) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: {
            data: usersList,
          }
        })
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
    return () => isMounted = false;
  }, [])

  const memoizedUsers = useMemo(
    () => filterUsers(data, searchText), [data, searchText]
  );


  const onSearchTextChange = (searchText) => {
    console.log("i was called", searchText);
    dispatch({
      type: UPDATE_SEARCH_TEXT,
      payload: {
        searchText,
      }
    });
  }

  return (
    <DashBoardContext.Provider value={dispatch}>
      <div className="DashBoard">
        <Search
          className="DashBoard__search"
          onSearchTextChange={onSearchTextChange}
          placeholder="Search by email, name or role"
        />
        <DataGrid
          data={memoizedUsers}
        />
      </div>
    </DashBoardContext.Provider>
  );
}

export {
  DashBoardContext,
  DashBoard,
}
