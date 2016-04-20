module.exports = {
  presets: [
    require('babel-preset-es2015'),
    require('babel-preset-react'),
  ],
  plugins: [
    [require('babel-plugin-transform-es2015-template-literals'), { spec: true }],
    require('babel-plugin-async-to-promises'),
    require('babel-plugin-transform-es3-member-expression-literals'),
    require('babel-plugin-transform-es3-property-literals'),
    require('babel-plugin-transform-jscript'),
    require('babel-plugin-transform-exponentiation-operator'),
  ],
};
