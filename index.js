'use strict';

var assign = require('object.assign');

var modules = [require('babel-plugin-transform-es2015-modules-commonjs'), {
  strictMode: true, // add "use strict"
  strict: false // this allows __esModule to be exported
}];

var defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  explorer: 9,
  firefox: 52,
  safari: 8,
  ucandroid: 1
};

function buildTargets(options) {
  return assign({}, defaultTargets, options.additionalTargets);
}

module.exports = function buildAirbnbPreset(context, options) {
  var transpileTargets = (options && options.targets) || buildTargets(options || {});

  var debug = (options && typeof options.debug === 'boolean') ? !!options.debug : false;

  return {
    presets: [
      require('babel-preset-env').default(null, {
        debug: debug,
        exclude: [
          'transform-async-to-generator',
          'transform-es2015-template-literals',
          'transform-regenerator'
        ],
        modules: false,
        targets: transpileTargets
      }),
      require('babel-preset-react')
    ],
    plugins: [
      options && !!options.removePropTypes ? ['babel-plugin-transform-react-remove-prop-types', assign({
        mode: 'wrap',
        additionalLibraries: ['airbnb-prop-types'],
        ignoreFilenames: ['node_modules']
      }, options.removePropTypes)] : null,

      options && options.modules === false ? null : modules,
      options && options.modules === false ? null : ['babel-plugin-transform-strict-mode', { strictMode: true }],
      [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true
      }],
      require('babel-plugin-transform-es5-property-mutators'),
      require('babel-plugin-transform-es3-member-expression-literals'),
      require('babel-plugin-transform-es3-property-literals'),
      require('babel-plugin-transform-jscript'),
      [require('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true
      }]
    ].filter(Boolean)
  };
};
