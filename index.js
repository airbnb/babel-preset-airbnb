/* eslint-disable no-var, prefer-template, comma-dangle */

'use strict';

module.exports = function buildAirbnbPreset(context, options) {
  // This is similar to how `env` works in Babel:
  // https://babeljs.io/docs/usage/babelrc/#env-option
  // We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
  // https://github.com/babel/babel/issues/4539
  // https://github.com/facebookincubator/create-react-app/issues/720
  // It’s also nice that we can enforce `NODE_ENV` being specified.
  var env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

  var allPlugins = [
    [require('babel-plugin-transform-es2015-block-scoping'), { throwIfClosureRequired: true }],
    [require('babel-plugin-transform-es2015-template-literals'), { spec: true }],
    require('babel-plugin-transform-es3-member-expression-literals'),
    require('babel-plugin-transform-es3-property-literals'),
    require('babel-plugin-transform-jscript'),
    require('babel-plugin-transform-exponentiation-operator'),
    require('babel-plugin-syntax-trailing-function-commas'),
    [require('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
    [require('babel-plugin-transform-react-jsx'), { useBuiltIns: true }],
  ];
  var preset; // eslint-disable-line no-var

  if (options && options.modules === false) {
    preset = require('babel-preset-es2015').buildPreset(null, { modules: false });
  } else {
    preset = require('babel-preset-es2015-without-strict');
  }

  if (env === 'development') {
    allPlugins.push(
      // Adds component stack to warning messages
      require.resolve('babel-plugin-transform-react-jsx-source'),
      // Adds __self attribute to JSX which React will use for some warnings
      require.resolve('babel-plugin-transform-react-jsx-self')
    );
  }

  return {
    presets: [
      preset,
      require('babel-preset-react'),
    ],
    plugins: allPlugins,
  };
};
