import App, { Container } from 'next/app';
import Raven from 'raven-js';
import React from 'react';
import withApollo from '~/shared/wrappers/withApollo';
import withReduxStore from '~/shared/wrappers/withReduxStore';

const environment = process.env.NODE_ENV;
const release = `manager-interface@${__MANAGER_INTERFACE_VERSION__} melon.js@${__MELON_JS_VERSION__} smart-contracts@${__SMART_CONTRACTS_VERSION__}`;

// Raven.config('https://14d859a5b75f4d4fbd79defb6d53129a@sentry.io/278024', {
//   release,
//   environment,
// }).install();

if (typeof window !== 'undefined') {
  console.log(
    '%c👋🤓',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 30px',
  );

  console.log(
    '%cHello nerd. Checking out the internals of the ipfs-frontend? We like that! If you want to work with us, send us a message: team@melonport.com.',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 12px',
  );
}

class MelonApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withReduxStore(withApollo(MelonApp));
