const resolve = require('path').resolve;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  // add your custom rules here
  rules: {},
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': resolve(__dirname, 'src'),
              '~static': resolve(__dirname, 'src/static'),
              '~assets': resolve(__dirname, 'src/assets'),
              '~components': resolve(__dirname, 'src/components'),
              '~scripts': resolve(__dirname, 'src/scripts'),
            }
          }
        }
      }
    }
  }
}
