import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import SearchContainer from 'containers/shared/SearchContainer'
import LoaderComponent from 'components/shared/LoaderComponent'
import ItemComponent from 'components/shared/ItemComponent';
import styles from './styles.scss';
import gql                from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const GET_QUERY_RESULT = gql`
    query Viewer($query: String!) {
 viewer {
  search(query: $query) {
   result {
   ... on Recruiter {
    firstName
    profilePhoto { url }
   }
   ... on Agency {
     name
     logo
     }
    }
   }
  }
 }
`;

class AppComponent extends PureComponent {
  state = {
    loading: false,
    data: null,
    error: null,
    query: null
  };

  /**
   * Handle search request and manage state logic
   *
   * @param {ApolloClient} client
   */
  _handleSearch = ( client ) => async (value) => {
    this.setState({ loading: true, query: value });
    try {
      const { data } = await client.query({
        query: GET_QUERY_RESULT,
        variables: {query: value}
      });
      this.setState({ loading: false, data, error: null });
    } catch (error) {
      this.setState({ loading: false, error, data: null });
    }
  };

  render() {

    const { loading, data, error, query } = this.state;
    const { _handleSearch } = this;
    
    const content = data && data.viewer.search.length ?
      <span className={styles.success}>Here is some items for your request: {query}</span> :
      <span className={styles.warning}>No items for your request: {query}</span>;

    return (
      <ApolloConsumer>
        { client => {
          const handleSearch = _handleSearch(client);
          return (
            <div className={styles.page}>
              <h1>
                Search implementation
              </h1>
              <SearchContainer
                onChange={handleSearch}
              />
              <div>
                {loading && <LoaderComponent row/>}
                {error && !loading && <span className={styles.error}>Some error during search has occur. Please repeat request.</span>}
                {data && !loading && content}
                {data && !loading && <div>
                  <ItemComponent/>
                </div>}
              </div>

            </div>
          );
        } }
      </ApolloConsumer>
    );
  }
}

export default withRouter( AppComponent );
