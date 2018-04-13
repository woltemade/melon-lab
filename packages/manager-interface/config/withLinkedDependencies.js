const path = require('path');

// Resolve the absolute path for a linked packages.
const resolveWorkspace = name => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, 'src');
};

module.exports = (nextConfig = {}) => {
  const links = nextConfig.linkedDependencies || [];
  if (!links || !links.length) {
    return nextConfig;
  }

  const includes = links.map(resolveWorkspace);

  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      // Properly resolve symlinks.
      config.module.rules.map(rule => {
        if (rule.loader === 'hot-self-accept-loader') {
          return rule;
        }

        if (rule.include && rule.include.length) {
          // Add our custom include rules including linked node modules.
          // We only need to add them if the original definition specified
          // any include rules itself. Rules without any defined "includes"
          // apply globally anyways.
          rule.include.push(includes);
        }

        return rule;
      });

      return config;
    },
  });
};
