require('dotenv-extended').config();

const path = require('path');
const fs = require('fs');
const externals = require('webpack-node-externals');

// Retrieve the absolute path of the linked package.
const resolveWorkspace = name => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, 'src');
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

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts'];
    config.output.path = path.resolve(process.cwd(), 'dist');

    config.resolve.extensions.push('.ts');
    config.resolve.alias = resolveWorkspaces([
      '@melonproject/graphql-schema',
      '@melonproject/exchange-aggregator',
    ]);

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.json',
            transpileOnly: true,
          },
        },
      ],
    });

    config.externals = externals({
      modulesDir: path.resolve(process.cwd(), '..', '..', 'node_modules'),
      whitelist: [
        '@melonproject/graphql-schema',
        '@melonproject/exchange-aggregator',
      ],
    });

    return config;
  },
};
