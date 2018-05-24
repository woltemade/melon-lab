require('dotenv-extended').config();

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const withTypeScript = require('@zeit/next-typescript');
const withQueryFiles = require('./config/withQueryFiles');
const withLinkedDependencies = require('./config/withLinkedDependencies');

const withComposedConfig = R.compose(
  withLinkedDependencies,
  withQueryFiles,
  withTypeScript,
);

const ownPkg = require('./package.json');
const melonJsPkg = require('@melonproject/melon.js/package.json');
const smartContractsPkg = require('@melonproject/smart-contracts/package.json');

module.exports = withComposedConfig({
  typescriptLoaderOptions: {
    // We have to specify this explicitly so the ts-loader does
    // not incorrectly use one of the linked package's tsconfig.json
    // when only compiling individual file e.g. during
    // hot-module-replacement.
    configFile: path.resolve(__dirname, 'tsconfig.json'),
  },
  linkedDependencies: [
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
  ],
  distDir: '../dist',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: (config, options) => {
    const src = path.resolve(__dirname, 'src');
    const electron = JSON.parse(process.env.ELECTRON || 'false');
    const transport = electron
      ? './withApollo.ipc.ts'
      : './withApollo.remote.ts';

    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      '~/shared': path.join(src, 'shared'),
      '~/legacy': path.join(src, 'legacy'),
      '~/apollo': path.join(src, 'pages', 'wrappers', transport),
    });

    // Make process.env.DEBUG accessible so we can use the debug package
    // to print debug messages even in a web worker which does not have
    // access to the default lookup strategy of the debug package (local storage).
    config.plugins.push(new webpack.EnvironmentPlugin(['DEBUG']));

    config.plugins.push(
      new webpack.DefinePlugin({
        __MANAGER_INTERFACE_VERSION__: JSON.stringify(ownPkg.version),
        __MELON_JS_VERSION__: JSON.stringify(melonJsPkg.version),
        __SMART_CONTRACTS_VERSION__: JSON.stringify(smartContractsPkg.version),
      }),
    );

    // Code splitting doesn't make much sense in an electron app.
    if (electron) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      );
    }

    return config;
  },
  assetPrefix: './',
});
