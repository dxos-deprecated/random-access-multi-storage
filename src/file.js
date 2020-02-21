//
// Copyright 2019 Wireline, Inc.
//

import path from 'path';

import raf from 'random-access-file';
import del from 'del';

import { RandomAccessAbstract } from './random-access-abstract';

export class File extends RandomAccessAbstract {
  _create (file) {
    return raf(path.join(this._root, file));
  }

  _destroy () {
    return del(this._root);
  }
}
