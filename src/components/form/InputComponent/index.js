import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import styles                   from './styles.scss';
import classNames               from 'classnames/bind';

const cx = classNames.bind(styles);

class InputComponent extends PureComponent {
    state = {
        isPlaceholderActive: this.props.value,
        isInputError: false,
        isInputFocus: false,
    };

    /**
     * Fix google chrome auto fill
     *
     * @param {HTMLElement} ref
     */
    _handleFixAutoFill = ( ref ) => {
        setTimeout(() => {
            if ( ref && ('rgb(250, 255, 189)' === window.getComputedStyle(ref).backgroundColor)) {
                this.setState({isPlaceholderActive: true});
            }
        }, 100);
    };

    /**
     * Set the value of the component, which in turn will validate it and the rest of the form (is required for Formsy to work.)
     *
     * @param {Event} event
     */
    _handleChangeValue = ( event ) => {
        let value = this.props.modifyValueOnChange ?
            this.props.modifyValueOnChange(event.currentTarget.value) : event.currentTarget.value;
        this.props.setValue(value);
        if ( this.props.onChange ) {
            this.props.onChange(value);
        }
    };

    /**
     * Handle input styles on input focus
     */
    _handleInputFocus = () => {
        this.setState({
            isPlaceholderActive: true,
            isInputError: false,
            isInputFocus: true,
        });
    };

    /**
     * Handle Input styles on input blur
     */
    _handleInputBlur = () => {
        this.setState({
            isPlaceholderActive: this.props.value || '',
            isInputError: this.props.errorMessage,
            isInputFocus: false,
        });
    };

    UNSAFE_componentWillReceiveProps() {
        if ( !this.state.isInputFocus ) {
            this.setState({
                isInputError: this.props.errorMessage,
            });
        }
    }

    render() {
        const { placeholder, value = '', name, type = 'text', errorMessage, required, className } = this.props;
        const { _handleChangeValue, _handleInputFocus, _handleInputBlur, _handleFixAutoFill } = this;
        const { isPlaceholderActive, isInputError, isInputFocus } = this.state;

        return (
            <div
                className={ cx(styles.container, className, {
                    [ styles.containerActive ]: isInputFocus,
                    [ styles.containerPlaceholderActive ]: isPlaceholderActive,
                    [ styles.containerError ]: isInputError,
                }) }
            >
                <label
                    className={ styles.placeholder }
                    htmlFor={ name }
                >
                    { placeholder }
                    { required &&
                    <span className={styles.required}>{ ' ' }*</span>
                    }
                </label>
                <div
                    className={ styles.inputBox }
                >
                    <input
                        id={ name }
                        required={ required }
                        className={ styles.input }
                        type={ type }
                        onChange={ _handleChangeValue }
                        onFocus={ _handleInputFocus }
                        onBlur={ _handleInputBlur }
                        value={ value }
                        name={ name }
                        ref={_handleFixAutoFill}
                    />
                    <span className={ styles.activeLine } />
                </div>
                { errorMessage &&
                <span className={ styles.error }>
                        { errorMessage }
                    </span> }
            </div>
        );
    }
}

InputComponent.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    setValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    modifyValueOnChange: PropTypes.func,
    required: PropTypes.bool,
};

export default InputComponent;
