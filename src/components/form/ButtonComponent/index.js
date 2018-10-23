import React      from 'react';
import styles     from './styles.scss';
import PropTypes  from 'prop-types';
import { Link }   from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ButtonComponent = ( props ) => {
    const {
        className = '',
        children,
        full,
        asLink,
        danger,
        onClick,
        disabled,
        to,
        type = 'button',
        white,
        lowercase,
        ariaLabel,
        small
    } = props;
    const Component = to ? Link : 'button';
    const restProps = to ? { role: 'button', to } : { type };
    const onKeyUp = e => {e.preventDefault();};

    return (
        <Component
            className={ cx(className, styles.button, {
                [ styles.buttonFull ]: full,
                [ styles.buttonWhite ]: white,
                [ styles.buttonAsLink ]: asLink,
                [ styles.buttonSmall ]: small,
                [ styles.buttonDanger ]: danger,
                [ styles.buttonUpperCase ]: lowercase,
                [ styles.buttonDisabled ]: disabled,
            }) }
            aria-label={ariaLabel}
            onClick={ onClick }
            { ...disabled && { onKeyUp } } // prevent handle button action from keyboard
            { ...restProps }
        >
            { children }
        </Component>
    );
};

ButtonComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    full: PropTypes.bool,
    asLink: PropTypes.bool,
    small: PropTypes.bool,
    danger: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    lowercase: PropTypes.bool,
    to: PropTypes.string,
    type: PropTypes.string,
    white: PropTypes.bool,
    ariaLabel: PropTypes.string,
};

export default ButtonComponent;
