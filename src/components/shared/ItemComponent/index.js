import React, { PureComponent, Fragment } from 'react';
import styles from './styles.scss';
import ModalComponent from 'components/layout/ModalComponent';

class ItemComponent extends PureComponent {
  state = {
    showDetail: false,
  };

  _handleShowDetail = () => {
    this.setState( {
      showDetail: true,
    } );
  };

  _handleHideDetail = () => {
    this.setState( {
      showDetail: false,
    } );
  };

  render() {
    const { _handleShowDetail, _handleHideDetail } = this;
    const { showDetail } = this.state;

    return (
      <Fragment>
        <div className={styles.item} onClick={_handleShowDetail}>
          Item example
        </div>
        {showDetail &&
        <ModalComponent handleClose={_handleHideDetail}>
          details
        </ModalComponent>
        }
      </Fragment>
    );
  }
}

export default ItemComponent;
