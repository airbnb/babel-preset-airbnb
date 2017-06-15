'use strict';

module.exports = function buildAirbnbPreset(context, options) {
  return {
    presets: [
      require('babel-preset-env').default(null, {
        debug: true,
        exclude: [
          'transform-async-to-generator',
          'transform-es2015-template-literals',
          'transform-regenerator',
        ],
        modules: false,
        targets: {
          browsers: [
            'Chrome >= 35',
            'Explorer >= 9',
            'Firefox >= 52',
            'Safari >= 8',
          ],
        },
      }),
      require('babel-preset-react'),
    ],
    plugins: [
      options && options.modules === false ? null : (
        [require("babel-plugin-transform-es2015-modules-commonjs"), {
          strict: false,
        }]
      ),
      [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true,
      }],
      require('babel-plugin-transform-es3-member-expression-literals'),
      require('babel-plugin-transform-es3-property-literals'),
      require('babel-plugin-transform-jscript'),
      [require('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true,
      }],
    ].filter(Boolean),
  };
};
