//
// Copyright 2020 DxOS.
//

import del from 'del';
import path from 'path';
import raf from 'random-access-file';

import { RandomAccessAbstract } from '../random-access-abstract';

/**
 * Node specific file storage.
 */
export class File extends RandomAccessAbstract {
  _create (filename) {
    return raf(path.join(this._root, filename));
  }

  _destroy () {
    return del(this._root);
  }
}
