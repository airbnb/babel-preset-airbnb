module.exports = function(context, options) {
  var es2015preset;
  if (options && options.modules === false) {
    es2015preset = ['es2015', { modules: false }];
  } else {
    es2015preset = 'es2015-without-strict';
  }

  return {
    presets: [
      es2015preset,
      'react',
    ],
    plugins: [
      ['transform-es2015-template-literals', { spec: true }],
      'transform-es3-member-expression-literals',
      'transform-es3-property-literals',
      'transform-jscript',
      'transform-exponentiation-operator',
      'syntax-trailing-function-commas',
      ['transform-object-rest-spread', { useBuiltIns: true }],
    ],
  };
}
