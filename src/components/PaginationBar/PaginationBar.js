import React from 'react';
import { FIRST, LAST, NEXT, PREVIOUS } from '../../utils/AppConstants';
import Button from '../Button';
import './PaginationBar.scss';

const PaginationBar = ({
  currentPage,
  onPageNavigation,
  totalNoOfPages,
  onDeleteItems,
}) => {
  const navigateToFirstPage = () => {
    onPageNavigation(FIRST)
  }

  const navigateToLastPage = () => {
    onPageNavigation(LAST)
  }

  const navigateToNextPage = () => {
    onPageNavigation(NEXT);
  }

  const navigateToPreviousPage = () => {
    onPageNavigation(PREVIOUS);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalNoOfPages;

  return (
    <div
      className="PaginationBar"
    >
      <div className="PaginationBar__deleteBtnWrapper">
        <Button
          buttonText="Delete Selected"
          className="PaginationBar__btnDelete"
          onButtonClick={onDeleteItems}
        />
      </div>
      <div className="PaginationBar__navBtnWrapper">
        <Button
          buttonText={"<<"}
          className="PaginationBar__btn"
          onButtonClick={navigateToFirstPage}
          disabled={isFirstPage}
        />
        <Button
          className="PaginationBar__btn"
          buttonText="<"
          onButtonClick={navigateToPreviousPage}
          disabled={isFirstPage}
        />
        <Button
          className="PaginationBar__btn"
          buttonText=">"
          onButtonClick={navigateToNextPage}
          disabled={isLastPage}
        />
        <Button
          className="PaginationBar__btn"
          buttonText=">>"
          onButtonClick={navigateToLastPage}
          disabled={isLastPage}
          />
      </div>
    </div>
  );
}

export default PaginationBar;
