'use strict';

module.exports = function buildAirbnbPreset(context, options) {
  var preset; // eslint-disable-line no-var
  if (options && options.modules === false) {
    preset = require('babel-preset-es2015').buildPreset(null, { modules: false });
  } else {
    preset = require('babel-preset-es2015-without-strict');
  }
  return {
    presets: [
      preset,
      require('babel-preset-react'),
    ],
    plugins: [
      [require('babel-plugin-transform-es2015-template-literals'), { spec: true }],
      require('babel-plugin-transform-es3-member-expression-literals'),
      require('babel-plugin-transform-es3-property-literals'),
      require('babel-plugin-transform-jscript'),
      require('babel-plugin-transform-exponentiation-operator'),
      require('babel-plugin-syntax-trailing-function-commas'),
      [require('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
    ],
  };
};
