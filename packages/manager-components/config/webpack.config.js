module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
        // Inherit the default babel-loader config from storybook.
        options: Object.assign({}, config.module.rules[0].query),
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  });

  return config;
};
