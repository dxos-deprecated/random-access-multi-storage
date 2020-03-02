# Random Access Multi Storage

[![Build Status](https://travis-ci.com/dxos/random-access-multi-storage.svg?branch=master)](https://travis-ci.com/dxos/random-access-multi-storage)
[![Coverage Status](https://coveralls.io/repos/github/dxos/random-access-multi-storage/badge.svg?branch=master)](https://coveralls.io/github/dxos/random-access-multi-storage?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/dxos/random-access-multi-storage.svg)](https://greenkeeper.io/)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Factory for creating platform-specific [random-access-storage](https://github.com/random-access-storage) files.

## Install

```
$ npm install @dxos/random-access-multi-storage
```

## Usage

```javascript
import { createStorage } from '@dxos/random-access-multi-storage';

const file = createStorage();
file.write(0, Buffer('hello'));
```

## Contributing

PRs accepted.

## License

GPL-3.0 © dxos
