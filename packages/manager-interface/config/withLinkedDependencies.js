const path = require('path');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

module.exports = (nextConfig = {}) => {
  const links = nextConfig.linkedDependencies || [];
  if (!links || !links.length) {
    return nextConfig;
  }

  // Generate custom include/exclude config for our module loaders.
  // These allow us to transpile code from specific linked packages
  // like our styleguide without having to pre-compile it elsewhere.
  const includes = links.map(module => {
    const relative = path.relative(
      process.cwd(),
      path.dirname(require.resolve(`${module}/package.json`))
    );

    return new RegExp(`${relative}(?!.*node_modules)`);
  });

  const modules = links.map(escapeRegExp).join('|');
  const excludes = new RegExp(`node_modules(?!\/(${modules})(?!.*node_modules))`);

  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      // Allow linked dependencies to use our node modules.
      config.resolve.modules.unshift(
        path.resolve(process.cwd(), 'node_modules')
      );

      // Properly resolve symlinks.
      config.resolve.symlinks = false;

      // Required for enabling externals from linked packages.
      config.externals = config.externals.map(external => {
        if (typeof external !== 'function') {
          return external;
        }

        return (ctx, req, cb) => {
          if (!!includes.find(include => include.test(req))) {
            return cb();
          }

          return external(ctx, req, cb);
        };
      });

      config.module.rules.map(rule => {
        if (rule.loader === 'hot-self-accept-loader') {
          return rule;
        }

        // Add our custom include rules including linked node modules.
        rule.include = [].concat(
          rule.include || [path.resolve(process.cwd())],
          includes
        );

        // Remove all exclude rules that would eliminate our linked modules.
        rule.exclude = []
          .concat(rule.exclude || [], excludes)
          .filter(exclude => {
            return !!nextConfig.linkedDependencies.find(
              module => !exclude.test(`node_modules/${module}`)
            );
          });

        return rule;
      });

      return config;
    },
    webpackDevMiddleware: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpackDevMiddleware === 'function') {
        config = nextConfig.webpackDevMiddleware(config, options);
      }

      config.watchOptions.ignored = [config.watchOptions.ignored[0]].concat(
        excludes
      );

      return config;
    },
  });
};
