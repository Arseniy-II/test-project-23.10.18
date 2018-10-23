import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import InputComponent from 'components/form/InputComponent';

class SearchContainer extends PureComponent {
  state = {
    search: '',
  };

  /**
   * Set value on change
   *
   * @param {string} [value]
   */
  _handleSetSearch = (value = '') => {
    this.setState( { search: value } );
    this.props.onChange(value);
  };

  render() {
    const {_handleSetSearch} = this;
    const {search} = this.state;

    return (
      <InputComponent
        placeholder='Search'
        name='search'
        setValue={_handleSetSearch}
        value={search}
      />
    )
  }
}

SearchContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchContainer;
