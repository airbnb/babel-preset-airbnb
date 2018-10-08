'use strict';

const { declare } = require('@babel/helper-plugin-utils');

const defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  explorer: 9,
  firefox: 52,
  safari: 8,
  ucandroid: 1,
};

function buildTargets({ additionalTargets }) {
  return Object.assign({}, defaultTargets, additionalTargets);
}

module.exports = declare((api, options) => {
  // see docs about api at https://babeljs.io/docs/en/config-files#apicache
  api.assertVersion(7);

  const {
    modules,
    targets = buildTargets(options),
    removePropTypes,
  } = options;

  if (typeof modules !== 'undefined' && typeof modules !== 'boolean' && modules !== 'auto') {
    throw new TypeError('babel-preset-airbnb only accepts `true`, `false`, or `"auto"` as the value of the "modules" option');
  }

  const debug = typeof options.debug === 'boolean' ? options.debug : false;
  const development = typeof options.development === 'boolean'
    ? options.development
    : api.cache.using(() => process.env.NODE_ENV === 'development');

  return {
    presets: [
      [require('@babel/preset-env'), {
        debug,
        exclude: [
          'transform-async-to-generator',
          'transform-template-literals',
          'transform-regenerator',
        ],
        modules: modules === false ? false : 'auto',
        targets,
      }],
      [require('@babel/preset-react'), { development }],
    ],
    plugins: [
      removePropTypes ? [require('babel-plugin-transform-react-remove-prop-types'), Object.assign({
        mode: 'wrap',
        additionalLibraries: ['airbnb-prop-types'],
        ignoreFilenames: ['node_modules'],
      }, removePropTypes)] : null,

      [require('@babel/plugin-transform-template-literals'), {
        spec: true,
      }],
      require('@babel/plugin-transform-property-mutators'),
      require('@babel/plugin-transform-member-expression-literals'),
      require('@babel/plugin-transform-property-literals'),
      require('@babel/plugin-transform-jscript'),
      [require('@babel/plugin-proposal-object-rest-spread'), {
        useBuiltIns: true,
      }],
    ].filter(Boolean),
  };
});
