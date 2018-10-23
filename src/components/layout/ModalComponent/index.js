import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import ReactDOM from 'react-dom';

const ModalComponent = ( props ) => {
    const { handleClose, children } = props;
    return ReactDOM.createPortal(
        <div className={styles.notificationContainer} onClick={() => {handleClose();}}>
            <div className={styles.notification} onClick={( event ) => {event.stopPropagation();}}>
                {children}
            </div>
        </div>,
        document.getElementById('modals')
    );
};

ModalComponent.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default ModalComponent;
