import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReload } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers/layout/AppContainer';
import PersistApolloProvider from 'graphql';

const render = Component => {
  ReactDOM.render(
    <HotReload>
      <PersistApolloProvider>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </PersistApolloProvider>
    </HotReload>,
    document.getElementById( 'app' ),
  );
};

render( AppContainer );

if ( module.hot ) {
  module.hot.accept( './containers/layout/AppContainer', () => {
    render( AppContainer );
    render( require( './containers/layout/AppContainer' ) );
  } );
}
