import React, { Component } from 'react';
import { ApolloProvider }               from 'react-apollo';
import { ApolloClient }                 from 'apollo-client';
import { ApolloLink }                   from 'apollo-link';
import { setContext }                   from 'apollo-link-context';
import { withClientState }              from 'apollo-link-state';
import { createHttpLink }               from 'apollo-link-http';
import { InMemoryCache }                from 'apollo-cache-inmemory';
import { persistCache }                 from 'apollo-cache-persist';
import { END_POINT, TOKEN }                    from '_constants';
import LoaderComponent from 'components/shared/LoaderComponent';

class PersistApolloProvider extends Component {
    state = {
        client: null,
        loaded: false,
    };

    async componentDidMount() {

        const httpLink = createHttpLink({
            uri: END_POINT,
        });

        const authLink = setContext(( _, { headers } ) => {
            return {
              headers: {
                ...headers,
                Authorization: `Bearer ${TOKEN}`,
              }
            }
        });

        const cache = new InMemoryCache();

        // Setup your Apollo Link, and any other Apollo packages here.
        const client = new ApolloClient({
            cache,
            link: ApolloLink.from([
                withClientState({ cache }),
                authLink,
                httpLink,
            ]),
        });

        try {
            // See above for additional options, including other storage providers.
            await persistCache({
                cache,
                storage: window.localStorage,
            });
        } catch (error) {
            console.error('Error restoring Apollo cache', error);
        }

        this.setState({
            client,
            loaded: true,
        });
    }

    render() {
        const { client, loaded } = this.state;
        const { children } = this.props;

        if ( !loaded ) {
            return <LoaderComponent full big/>;
        }

        return (
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        );
    }
}

export default PersistApolloProvider;
