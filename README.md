# babel-preset-airbnb

> A babel preset for transforming your JavaScript for Airbnb.

Currently contains transforms for all standard syntax that is [stage 4](https://tc39.github.io/ecma262/) (ES2018) or [stage 3](https://github.com/tc39/proposals#active-proposals), except for the following:
 - generators: `regenerator-runtime` is too heavyweight for our use.
 - `async/await`: `regenerator-runtime` is too heavyweight for our use, and [async-to-promises](https://www.npmjs.com/package/babel-plugin-async-to-promises) is not yet complete enough to be safely used.
 - async iterators: depends on both generators and `async function`s
 - lifted template literal restrictions: we do not use tagged template literals, nor implement custom DSLs, otherwise we would enable this.

## Install

```sh
$ npm install --save-dev babel-preset-airbnb
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["airbnb"]
}
```

### Via CLI

```sh
$ babel script.js --presets airbnb
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["airbnb"]
});
```

### Targeting Environments

This module uses babel-preset-env to target specific environments.

Please refer to [babel-preset-env#targets](https://github.com/babel/babel-preset-env#targets) for a list of available options.

For a list of browsers please see [browserlist](https://github.com/ai/browserslist).

You may override our default list of targets by providing your own `targets` key.

```json
{
  "presets": [["airbnb", {
    "targets": {
      "chrome": 50,
      "explorer": 11,
      "firefox": 45
    }
  }]]
}
```

The following transpiles only for Node v6.

```json
{
  "presets": [["airbnb", {
    "targets": {
      "node": 6
    }
  }]]
}
```

If you wish, you can also inherit our default list of browsers and extend them using `additionalTargets`.

```json
{
  "presets": [["airbnb", {
    "additionalTargets": {
      "chrome": 42,
      "explorer": 8
    }
  }]]
}
```

You may override our default debug option by providing your own `debug` key.

```json
{
  "presets": [["airbnb", {
    "debug": true
  }]]
}
```

## React PropTypes removal

This preset can be configured to remove propTypes using [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) with the following default options:


To enable this transformation with the default options, set the `removePropTypes` option to `true`:

```json
{
  "presets": [["airbnb", {
    "removePropTypes": true
  }]]
}
```

The default options that will be used are:

```js
{
  mode: 'wrap',
  additionalLibraries: ['airbnb-prop-types'],
  ignoreFilenames: ['node_modules'],
}
```

Default options can be overridden using the `removePropTypes` option. These options will be shallow-merged with the defaults:

```json
{
  "presets": [["airbnb", {
    "removePropTypes": {
      "mode": "remove"
    }
  }]]
}
```

For example, if you are using this plugin in a deployable app, you might want to use the remove mode for your production build (and disable this transform entirely in development for optimal build speeds).
