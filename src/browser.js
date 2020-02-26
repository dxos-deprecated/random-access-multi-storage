//
// Copyright 2020 DxOS.
//

import { createStorage as _createStorage } from './storage';
import { STORAGE_RAM, STORAGE_IDB, STORAGE_CHROME, STORAGE_FIREFOX } from './storage-types';
import { Memory } from './memory';
import { IDB } from './idb';
import { ChromeFile } from './chrome-file';
import { FirefoxFile } from './firefox-file';

const storageTypes = {
  [STORAGE_RAM]: Memory,
  [STORAGE_IDB]: IDB,
  [STORAGE_CHROME]: ChromeFile,
  [STORAGE_FIREFOX]: FirefoxFile
};

export * from './storage-types';
export const createStorage = _createStorage(storageTypes);
