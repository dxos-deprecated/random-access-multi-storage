//
// Copyright 2020 DxOS.
//

import assert from 'assert';

import { STORAGE_NODE, STORAGE_CHROME, STORAGE_MOZILLA, STORAGE_IDB } from './storage-types';

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const isBrowser = typeof window !== 'undefined';

const defaultStorageType = () => {
  if (isNode) {
    return STORAGE_NODE;
  }

  if (isBrowser) {
    if (window.requestFileSystem || window.webkitRequestFileSystem) {
      return STORAGE_CHROME;
    }

    if (window.IDBMutableFile) {
      return STORAGE_MOZILLA;
    }

    return STORAGE_IDB;
  }

  throw new Error('Unknown platform');
};

export const createStorageFactory = storageTypes => (root, type = defaultStorageType()) => {
  assert(typeof root === 'string');
  assert(storageTypes[type], `Invalid type: ${type}`);

  const storage = new storageTypes[type](root);

  function randomAccessStorage (file) {
    return storage.create(file);
  }

  // TODO(burdon): We should have a wrapper rather than adding properties to other objects.
  randomAccessStorage.destroy = () => storage.destroy();
  randomAccessStorage.root = root;
  randomAccessStorage.type = type;

  // TODO(burdon): Remove since only used for testing.
  randomAccessStorage._storage = storage;

  return randomAccessStorage;
};
