import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ReactModal from 'react-modal';
import melonJsPkg from '@melonproject/melon.js/../package.json';
import melonProtocolPkg from '@melonproject/protocol/package.json';
import addressBook from '@melonproject/protocol/addressBook.json';
import apolloClient from './graphql/client';
import pkg from '../../package.json';
import { configureStore } from './config/configureStore';
import AppContainer from './containers/App';
import { actions } from './actions/browser';

if (typeof window !== 'undefined') {
  console.log(
    '%c👋🤓',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 30px',
  );
  console.log(
    '%cHello nerd. Checking out the internals of the ipfs-frontend? We like that! If you want to work with us, send us a message: team@melonport.com.',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 12px',
  );

  ReactModal.setAppElement('#__next');
}

global.MELON_VERSIONS = `ipfs-frontend@${pkg.version} melon.js@${
  melonJsPkg.version
} protocol@${melonProtocolPkg.version}`;

global.MELON_ADDRESSBOOK = addressBook;

global.ENVIRONMENT = process.env.NODE_ENV;

if (global.Raven)
  global.Raven.config(
    'https://14d859a5b75f4d4fbd79defb6d53129a@sentry.io/278024',
    {
      release: global.MELON_VERSIONS,
      environment: global.ENVIRONMENT,
    },
  ).install();

export const store = configureStore();

if (typeof window !== 'undefined') {
  global.addEventListener('load', () => {
    store.dispatch(actions.loaded());

    /*
  // TODO: Refactor this ino own saga
  const tracker = melonTracker.on("DataUpdated", "LogItemUpdate");

  tracker(type => {
    switch (type) {
      case "DataUpdated":
        store.dispatch(fundHoldingsCreators.requestPrices());
        break;

      case "LogItemUpdate":
        store.dispatch(
          orderbookCreators.requestOrderbook(
            store.getState().general.assetPair,
          ),
        );
        break;

      default:
    }
  });
  */
  });
}

export default () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </ApolloProvider>
);
