const path = require('path');
const R = require('ramda');
const withTypeScript = require('@zeit/next-typescript')
const withQueryFiles = require('./config/withQueryFiles');
const withLinkedDependencies = require('./config/withLinkedDependencies');
const withResolveAliases = require('./config/withResolveAliases');
const withWebWorkers = require('./config/withWebWorkers');

const withComposedConfig = R.compose(
  withLinkedDependencies,
  withResolveAliases,
  withWebWorkers,
  withQueryFiles,
  withTypeScript,
);

// Retrieve the relative path of the linked package.
const resolveWorkspace = name => {
  const package = path.dirname(require.resolve(`${name}/package.json`));
  return path.resolve(package, 'src');
};

const resolveWorkspaces = (names) => {
  const workspaces = names.reduce((carry, current) => {
    return ({
      ...carry,
      [current]: resolveWorkspace(current),
    });
  }, {});

  return workspaces;
};

module.exports = withComposedConfig({
  webWorkers: /\/graphql\/worker\.ts$/,
  typescriptLoaderOptions: {
    // We have to specify this explicitly so the ts-loader does
    // not incorrectly use one of the linked package's tsconfig.json
    // when only compiling individual file e.g. during
    // hot-module-replacement.
    configFile: path.resolve(__dirname, 'tsconfig.json'),
  },
  linkedDependencies: [
    '@melonproject/graphql-schema',
    '@melonproject/manager-components',
    '@melonproject/exchange-aggregator',
  ],
  resolveAliases: resolveWorkspaces([
    '@melonproject/graphql-schema',
    '@melonproject/manager-components',
    '@melonproject/exchange-aggregator',
  ]),
  distDir: '../dist',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
