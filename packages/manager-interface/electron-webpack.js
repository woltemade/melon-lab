const path = require('path');

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


module.exports = (config) => {
  return new Promise((resolve) => {
    config.resolve.extensions.push('.ts', '.tsx');

    // Add support for typescript.
    config.module.rules = [{
      test: /\.(js|node)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      ],
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
      ],
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }];

    const links = [
      ['@melonproject/melon.js', 'lib'],
      ['@melonproject/graphql-schema', 'src'],
      ['@melonproject/manager-components', 'src'],
      ['@melonproject/exchange-aggregator', 'src'],
    ];

    // Add aliases for all local packages.
    config.resolve.alias = resolveWorkspaces(links);

    // Remove all local packages from the externals.
    const locals = links.map(([name]) => name);
    config.externals = config.externals.filter((name) => locals.indexOf(name) === -1);

    resolve(config);
  });
}