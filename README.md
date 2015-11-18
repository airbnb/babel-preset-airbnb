# babel-preset-airbnb

> A babel preset for transforming your JavaScript for Airbnb.

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
