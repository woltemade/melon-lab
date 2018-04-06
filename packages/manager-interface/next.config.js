const withQueryFiles = require('./config/withQueryFiles');
const withLinkedDependencies = require('./config/withLinkedDependencies');

module.exports = withLinkedDependencies(withQueryFiles({
  linkedDependencies: ['@melonproject/graphql-schema'],
  distDir: '../dist',
}));
