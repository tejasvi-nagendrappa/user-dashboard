import React, { useState, useContext } from 'react';
import Proptypes from 'prop-types';
import GridRow from '../GridRow';
import PaginationBar from '../PaginationBar/PaginationBar';
import ViewRow from '../ViewRow';
import {
  FIRST, LAST, PREVIOUS, NEXT, DELETE_USERS, ROWS_PER_PAGE
} from '../../utils/AppConstants';
import { DashBoardContext } from '../DashBoard';
import './DataGrid.scss';
import MessageDisplay from '../MessageDisplay';


const propTypes = {
  data: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string,
    name: Proptypes.string,
    email: Proptypes.string,
    role: Proptypes.string,
  })),
}
const defaultProps = {
  data: [],
};

const DataGrid = ({ data = [] }) => {

  const [state, setstate] = useState({
    selectedRowIds: [],
    currentPage: 1,
  });

  const dispatch = useContext(DashBoardContext);

  const { currentPage, selectedRowIds } = state;
  const getNoOfPages = () => {
   return Math.ceil(data.length / ROWS_PER_PAGE);
  }

  const onSelectAll = (val) => {
    const currPageRows = getCurrPageRows();
    const rowIds = currPageRows.map(({ id }) => id);

    setstate({
      ...state,
      selectedRowIds: val ? rowIds : [],
    });
  }

  const renderGridHeader = () => {
    const noOfUsers = getCurrPageRows().length;
    const noOfSelectedRows = selectedRowIds.length;
    return (
      <ViewRow
        className="ViewRowHeader"
        rowData={{
          id: "ROW_HEADER",
          name: "NAME",
          email: "EMAIL",
          role: "ROLE",
        }}
        isRowHeader
        onSelectAll={onSelectAll}
        isRowChecked={
          noOfSelectedRows === noOfUsers && noOfUsers > 0
        }
      />
    );
  };

  const getCurrPageRows = () => {
    const noOfUsers = data.length;

    if (noOfUsers > ROWS_PER_PAGE) {
       const lastIndex = data.length - 1;
      let itemStartIndex = 0;

      if (currentPage > 1) {
        itemStartIndex = itemStartIndex + ((currentPage - 1) * ROWS_PER_PAGE - 1);
      }
      let itemEndIndex = itemStartIndex + ROWS_PER_PAGE;
      itemEndIndex = itemEndIndex <= lastIndex ?  itemEndIndex : lastIndex;
      const slicedData = data.slice(itemStartIndex, itemEndIndex);
      return slicedData;
    }

    return data;
  }

  const updatePageNumber = (pageNumber) => {
    setstate({
      ...state,
      currentPage: pageNumber,
      selectedRowIds: [],
    });
  }

  const onPageChange = (action) => {
    if (action === PREVIOUS) {
      updatePageNumber(currentPage - 1);
    }

    if (action === NEXT) {
      updatePageNumber(currentPage + 1);
    }

    if (action === FIRST) {
      updatePageNumber(1);
    }

    if (action === LAST) {
      const lastPageNumber = getNoOfPages();
      updatePageNumber(lastPageNumber);
    }

  }

  const onRowSelect = (selected, id) => {
    let idsToDelete = [...selectedRowIds];
    if (selected) {
      idsToDelete = [...selectedRowIds, id];

    } else {
      idsToDelete = idsToDelete.filter((deleteId) => {
        return deleteId !== id;
      });
    }

    setstate({
      ...state,
      selectedRowIds: idsToDelete,
    });
  }

  const renderGridRows = () => {
    const currPageRows = getCurrPageRows();

    if (currPageRows.length > 0) {
      const rows = currPageRows.map((row) => {
        const { id, name } = row;
        const isRowChecked = selectedRowIds.includes(id);
        return (
          <GridRow
            rowData={row}
            isRowChecked={isRowChecked}
            key={`GridRow-${id}-${name}`}
            onRowSelect={onRowSelect}
          />
        )
      });
      return rows;
    }

    return (
      <MessageDisplay
        message="No Users Found. Try refining your search"
      />
    );
  };

  const deleteSelectedItems = () => {
    dispatch({
      type: DELETE_USERS,
      payload: {
        ids: selectedRowIds,
      }
    });
    const updatedPageNumber = currentPage >= getNoOfPages() ?
      currentPage - 1 : currentPage;
    setstate({
      ...state,
      selectedRowIds: [],
      currentPage: updatedPageNumber,
    })
  }

  return (
    <div className="DataGrid">
      { renderGridHeader()}
      { renderGridRows()}
      {
        data && data.length > 0 &&
        <PaginationBar
          totalNoOfPages={getNoOfPages()}
          currentPage={currentPage}
          onPageNavigation={onPageChange}
          onDeleteItems={deleteSelectedItems}
        />
      }
    </div>
  );
};

DataGrid.propTypes = propTypes;
DataGrid.defaultProps = defaultProps;

export default DataGrid;
