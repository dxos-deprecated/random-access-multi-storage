//
// Copyright 2019 Wireline, Inc.
//

import pify from 'pify';

export class RandomAccessAbstract {
  constructor (root) {
    this._root = root;
    this._files = new Set();
  }

  create (filename) {
    const file = this._create(filename);
    this._files.add(file);
    return file;
  }

  async close () {
    return Promise.all(Array.from(this._files.values()).map(file => pify(file.close.bind(file))().catch(() => {})));
  }

  async destroy () {
    try {
      await this.close();
      await this._destroy();
      this._files.clear();
    } catch (err) {
      console.error(err.message);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _create () {
    throw new Error('Missing implementation.');
  }

  // eslint-disable-next-line class-methods-use-this
  async _destroy () {
    throw new Error('Missing implementation.');
  }
}
