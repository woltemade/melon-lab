const path = require('path');

module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          // Inherit the default babel-loader config from storybook.
          loader: config.module.rules[0].loader,
          options: config.module.rules[0].query,
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'babel-plugin-transform-es2015-modules-commonjs',
              ['styled-jsx/babel', { plugins: ['styled-jsx-plugin-postcss'] }],
            ],
          },
        },
        'styled-jsx-css-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    },
  );

  return config;
};
