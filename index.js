'use strict';

const browsers = [
  'Chrome >= 35',
  'Explorer >= 9',
  'Firefox >= 52',
  'Safari >= 8',
];

function setNodeVersion(version) {
  if (typeof version !== 'string' && version !== true) {
    throw new TypeError('`node` must either be `true` or a string');
  }
  return version === true ? '6.10.2' : version;
}

module.exports = function buildAirbnbPreset(context, options) {
  const targets = options.node
    ? { node: setNodeVersion(options.node) }
    : { browsers };
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
        targets,
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
