
const postcssCssNext = require('postcss-cssnext');
const variables = require('./src/styles/variables');
const mediaQueries = require('./src/styles/mediaQueries');

module.exports = {
  plugins: [
    postcssCssNext({
      features: {
        customProperties: { variables: variables },
        customMedia: { extensions: mediaQueries }
      }
    }),
  ]
}
