//
// Copyright 2019 Wireline, Inc.
//

import pify from 'pify';
import ram from 'random-access-memory';

import { RandomAccessAbstract } from './random-access-abstract';

export class Memory extends RandomAccessAbstract {
  // eslint-disable-next-line class-methods-use-this
  _create () {
    return ram();
  }

  async _destroy () {
    return Promise.all(Array.from(this._files.values()).map(file => pify(file.destroy.bind(file))()));
  }
}
