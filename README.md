# Hilbert-2D [![npm version](https://badge.fury.io/js/hilbert-2d.svg)](https://badge.fury.io/js/hilbert-2d) [![CircleCI](https://circleci.com/gh/w8r/hilbert-2d.svg?style=svg)](https://circleci.com/gh/w8r/hilbert-2d)

2D [Hilbert curve](https://en.wikipedia.org/wiki/Hilbert_curve) coordinate encoder/decoder

![Hilbert-gif](https://upload.wikimedia.org/wikipedia/commons/4/46/Hilbert_curve.gif);

The code is ported from Go to JS from https://github.com/google/hilbert/
Inlined rotations to eliminate function calls.

## Install

```
npm install -S hilbert-2d
```

## API

```js
const h = require('hilbert-2d');

h.encode(16, [12, 23]); // 837
h.decode(16, 837);      // [12, 23]
```

## TODO

- [ ] Add range queries and sorting
- [ ] Add examples
