const path = require('path');
const escape = require('escape-string-regexp');
const { getBabelLoader, getLoader } = require('react-app-rewired');

// Retrieve the absolute path of the linked package.
const resolveWorkspace = (name, directory) => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, directory);
};

const resolveWorkspaces = pairs => {
  const workspaces = pairs.reduce((carry, [name, directory]) => {
    return {
      ...carry,
      [name]: resolveWorkspace(name, directory),
    };
  }, {});

  return workspaces;
};

const links = resolveWorkspaces([
  ['@melonproject/melon.js', 'lib'],
  ['@melonproject/graphql-schema', 'src'],
  ['@melonproject/exchange-aggregator', 'src'],
]);

const includes = Object.values(links);
const addIncludes = rule => {
  if (rule.loader === 'hot-self-accept-loader') {
    return rule;
  }

  if (rule.include && rule.include.length) {
    // Add our custom include rules including linked node modules.
    // We only need to add them if the original definition specified
    // any include rules itself. Rules without any defined "includes"
    // apply globally anyways.
    rule.include =
      typeof rule.include === 'string' ? [rule.include] : rule.include;
    rule.include = rule.include.concat(includes);
  }

  if (rule.oneOf && rule.oneOf.length) {
    rule.oneOf = rule.oneOf.map(addIncludes);
  }

  return rule;
};

module.exports = {
  webpack: (config, env) => {
    // Allow the module resolver to look for .ts and .tsx files too.
    config.resolve.extensions.push('.ts', '.tsx');

    // Allow to transpile source files outside of ./src.
    delete config.resolve.plugins;

    const rule = getLoader(config.module.rules, rule => {
      if (rule.oneOf && getBabelLoader(rule.oneOf)) {
        // If the current rule contains the babel loader, it's
        // the right place for us to add our custom loaders too.
        // Also: Fuck react-scripts.
        rule.oneOf.unshift(
          {
            test: /\/graphql\/worker\.js$/,
            exclude: /node_modules/,
            loader: 'worker-loader',
          },
          {
            test: /\.gql$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        );
      }
    });

    // Allow custom .babelrc config overrides.
    const loader = getBabelLoader(config.module.rules);
    loader.options.babelrc = true;

    // Include linked locale packages for transpiling.
    config.module.rules.map(addIncludes);
    // Add aliases for local packages.
    config.resolve.alias = Object.assign({}, links, config.resolve.alias || {});

    return config;
  },
  devServer: configFunction => (proxy, allowedHost) => {
    // Create the default config by calling configFunction with the proxy/allowedHost parameters
    const config = configFunction(proxy, allowedHost);
    const paths = includes
      .concat([path.resolve(__dirname, 'src')])
      .map(dir => {
        return escape(path.normalize(dir + '/').replace(/[\\]+/g, '/'));
      })
      .join(')|(');

    const regex = new RegExp(`^(?!(${paths})).+/node_modules/`, 'g');
    config.watchOptions.ignored = regex;

    return config;
  },
};
