module.exports = {
  presets: [
    require('babel-preset-env'),
    require('babel-preset-react'),
  ],
  plugins: [
    require('babel-plugin-dynamic-import-webpack').default,
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-object-rest-spread'),
    require('babel-plugin-emotion').default,
  ],
  env: {
    development: {
      plugins: [
        require('babel-plugin-react-hot-loader/babel'),
      ],
    },
  },
};
