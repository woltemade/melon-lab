module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
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
  });

  return config;
};
