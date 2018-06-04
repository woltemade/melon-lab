const postcssCssNext = require('postcss-cssnext');
const variables = require('./src/design/variables');
const mediaQueries = require('./src/design/mediaQueries');

module.exports = {
  plugins: [
    postcssCssNext({
      features: {
        customProperties: { variables: variables },
        customMedia: { extensions: mediaQueries },
      },
    }),
  ],
};
