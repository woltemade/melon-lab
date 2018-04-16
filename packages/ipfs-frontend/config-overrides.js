const path = require('path');
const { getBabelLoader } = require('react-app-rewired');

// Retrieve the absolute path of the linked package.
const resolveWorkspace = (name, directory) => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, directory);
};

const resolveWorkspaces = (pairs) => {
  const workspaces = pairs.reduce((carry, [name, directory]) => {
    return ({
      ...carry,
      [name]: resolveWorkspace(name, directory),
    });
  }, {});

  return workspaces;
};

const links = resolveWorkspaces([
  ['@melonproject/melon.js', 'lib'],
  ['@melonproject/graphql-schema', 'src'],
]);

const includes = Object.values(links);
const addIncludes = (rule) => {
  if (rule.loader === 'hot-self-accept-loader') {
    return rule;
  }

  if (rule.include && rule.include.length) {
    // Add our custom include rules including linked node modules.
    // We only need to add them if the original definition specified
    // any include rules itself. Rules without any defined "includes"
    // apply globally anyways.
    rule.include = typeof rule.include === 'string' ? [rule.include] : rule.include;
    rule.include = rule.include.concat(includes);
  }

  if (rule.oneOf && rule.oneOf.length) {
    rule.oneOf = rule.oneOf.map(addIncludes);
  }

  return rule;
};

module.exports = (config, env) => {
  config.module.rules.push({
    test: /\/graphql\/worker\.js$/,
    exclude: /node_modules/,
    loader: 'worker-loader',
  });

  // Allow to transpile source files outside of ./src.
  delete config.resolve.plugins;

  // Allow custom .babelrc config overrides.
  const loader = getBabelLoader(config.module.rules);
  loader.options.babelrc = true;

  // Include linked locale packages for transpiling.
  config.module.rules.map(addIncludes);
  // Add aliases for local packages.
  config.resolve.alias = Object.assign({}, links, (config.resolve.alias || {}));

  return config;
};
