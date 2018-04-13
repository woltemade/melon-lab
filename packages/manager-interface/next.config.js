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

// Retrieve the absolute path of the linked package.
const resolveWorkspace = (name, directory) => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, directory);
};

const resolveWorkspaces = (pairs) => {
  const workspaces = pairs.reduce((carry, [name, directory]) => {
    return ({
      ...carry,
      [name]: resolveWorkspace(name, directory),
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
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
  ],
  resolveAliases: resolveWorkspaces([
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
  ]),
  distDir: '../dist',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
