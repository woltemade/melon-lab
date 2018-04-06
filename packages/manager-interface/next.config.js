const withQueryFiles = require('./config/withQueryFiles');
const withLinkedDependencies = require('./config/withLinkedDependencies');
const withWebWorkers = require('./config/withWebWorkers');

module.exports = withLinkedDependencies(withWebWorkers(withQueryFiles({
  webWorkers: /\/graphql\/worker\.js$/,
  linkedDependencies: ['@melonproject/graphql-schema'],
  distDir: '../dist',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
})));
