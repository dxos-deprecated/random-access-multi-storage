//
// Copyright 2020 DxOS.
//

import randomAccessMutable from 'random-access-web/mutable-file-wrapper';

import { IDB } from './idb';

export class FirefoxFile extends IDB {
  _createFileStorage () {
    return randomAccessMutable({ name: this._root });
  }
}
