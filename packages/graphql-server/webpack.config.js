const path = require('path');
const fs = require('fs');
const externals = require('webpack-node-externals');

// Retrieve the relative path of the linked package.
const schema = path.dirname(
  require.resolve(`@melonproject/graphql-schema/package.json`)
);

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js'
  },
  resolve: {
    mainFields: ['main'],
    extensions: ['.ts', '.js'],
    alias: {
      '@melonproject/graphql-schema': path.resolve(schema, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.build.json',
        }
      }
    ]
  },
  externals: [externals({
    modulesDir: path.resolve(process.cwd(), '..', '..', 'node_modules'),
    whitelist: ['@melonproject/graphql-schema'],
  })],
};
