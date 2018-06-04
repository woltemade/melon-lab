const path = require("path");

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
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[local]-[hash:base64:5]"
          }
        },
        'postcss-loader'
      ],
      include: path.resolve(__dirname, "../src")
    }
  );

  return config;
};
