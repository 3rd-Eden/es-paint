# es-paint

A modern take on coloring CLI applications, adding colors to variables by
processing template literals.

## Installation

It assumes that you are running a Node.js version (4+) that has support for ES6
template literals.

```
npm install --save es-paint
```

## Usage

The `es-paint` returns a function that should be used as template literal
processor:

```js
const { paint } = require('es-paint');

const version = '1.3.31';
const name = 'example';

console.log(paint`USAGE: ${name}|>#ff69B4 [options]`);
console.log('');
console.log(paint`current version: ${version}|>red`);
```

Adding `|>` or `=>` after the template variable `${variable}` will re-color the
variables result in the given color name.

```js
paint`${variable}|>red${variable}=>yellow`
```

In addition to color names, you can also use HEX colors, these are
automatically transformed to the closest matching ANSI color.

```js
console.log(paint`hello ${world}|>#FF69B4`);
```

The example above will render `hello ` in normal colors and `world` in
**hot pink**.

So, what about that use-case when people want to disable the use of colors?

```js
const { stripper } = require('es-paint');
```

Same syntax, just doesn't apply colors.

## License

MIT
