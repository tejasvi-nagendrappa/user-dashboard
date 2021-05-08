import React from 'react';
import { DashBoard } from '../../components/DashBoard';
import MessageDisplay from '../../components/MessageDisplay';
import './DashBoardContainer.scss';

class DashBoardContainer extends React.Component {
  state = {
    isError: false,
    errorMsg: '',
  };

  componentDidCatch(error) {
    this.setState({
      isError: true,
      errorMsg: error,
    });
  }

  render() {
    const { isError, errorMsg } = this.state;
    return (
      <div className="DashBoardContainer" >
        {
          isError
            ?
            <MessageDisplay
              message={errorMsg}
              className="Error"
            />
            :  <DashBoard />
        }

      </div >
    )
  }
}

export default DashBoardContainer;
