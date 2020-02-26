//
// Copyright 2020 DxOS.
//

import { createStorage as _createStorage } from './storage';
import { STORAGE_FILE, STORAGE_RAM } from './storage-types';
import { Memory } from './memory';
import { File } from './file';

const storageTypes = {
  [STORAGE_RAM]: Memory,
  [STORAGE_FILE]: File
};

export * from './storage-types';
export const createStorage = _createStorage(storageTypes);
