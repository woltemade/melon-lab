module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      // Nothing to do if no web workers dependencies are provided.
      if (typeof nextConfig.webWorkers === 'undefined') {
        return config;
      }

      config.module.rules.push({
        test: nextConfig.webWorkers,
        exclude: /node_modules/,
        loader: 'worker-loader',
      });

      return config;
    },
  });
};
