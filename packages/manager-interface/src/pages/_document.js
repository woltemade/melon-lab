import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/static/favicon.png?v=2" />
          <link rel="stylesheet" href="/static/static/css/semantic.min.css" />
          <link rel="stylesheet" href="/static/static/css/overwrites.css" />
          <script src="/static/tracking.js" />
          <title>Melon on IPFS</title>
        </Head>
        <body>
          <Main />
          <NextScript />

          <div
            style={{
              textAlign: 'center',
              marginTop: '2em',
              marginBottom: '2em',
            }}
          >
            Hosted with ❤ on IPFS |
            <a
              href="https://github.com/melonproject/ipfs-frontend/issues"
              target="_blank"
            >
              Report an issue
            </a>{' '}
            |
            <a href="https://www.melonport.com" target="_blank">
              Melonport
            </a>
          </div>
        </body>
      </html>
    );
  }
}
