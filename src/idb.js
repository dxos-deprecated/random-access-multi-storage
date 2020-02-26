//
// Copyright 2020 DxOS.
//

import randomAccessIdb from 'random-access-idb';

import { RandomAccessAbstract } from './random-access-abstract';

export class IDB extends RandomAccessAbstract {
  constructor (root) {
    super(root);

    this._fileStorage = null;
  }

  _create (file) {
    if (this._files.size === 0) {
      this._fileStorage = this._createFileStorage();
    }

    const f = this._fileStorage(file);
    const oldClose = f.close.bind(f);
    f.close = (cb) => {
      this._files.delete(f);

      if (this._files.size === 0) {
        return oldClose(cb);
      }

      return cb();
    };

    return f;
  }

  async _destroy () {
    return indexedDB.deleteDatabase(this._root);
  }

  _createFileStorage () {
    return randomAccessIdb(this._root);
  }
}
