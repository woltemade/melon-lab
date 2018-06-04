
const postcssCssNext = require('postcss-cssnext');
const variables = require('./src/styles/variables');

module.exports = {
  plugins: [
    postcssCssNext({
      features: {
        customProperties: { variables: variables }
      }
    }),
  ]
}
