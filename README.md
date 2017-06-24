# babel-preset-airbnb

> A babel preset for transforming your JavaScript for Airbnb.

Currently contains transforms for all standard syntax that is [stage 4](https://tc39.github.io/ecma262/) (ES2017) or [stage 3](https://github.com/tc39/proposals#active-proposals), except for the following:
 - generators: `regenerator-runtime` is too heavyweight for our use.
 - `async/await`: `regenerator-runtime` is too heavyweight for our use, and [async-to-promises](https://www.npmjs.com/package/babel-plugin-async-to-promises) is not yet complete enough to be safely used.
 - `SIMD`: this is a performance feature, so is pretty pointless to polyfill/transpile.
 - lifted template literal restrictions: we do not use tagged template literals, nor implement custom DSLs, otherwise we would enable this.

We have also enabled object rest/spread, although it is only at stage 2. It will hopefully achieve stage 3 soon.

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
