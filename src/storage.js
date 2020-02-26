//
// Copyright 2020 DxOS.
//

import assert from 'assert';

import { STORAGE_FILE, STORAGE_RAM, STORAGE_CHROME, STORAGE_FIREFOX, STORAGE_IDB } from './storage-types';

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const defaultStorageType = () => {
  if (isNode) {
    return STORAGE_FILE;
  }

  if (!window) {
    return STORAGE_RAM;
  }

  if (window.requestFileSystem || window.webkitRequestFileSystem) {
    return STORAGE_CHROME;
  }

  if (window.IDBMutableFile) {
    return STORAGE_FIREFOX;
  }

  return STORAGE_IDB;
};

export const createStorage = storageTypes => (root, type = defaultStorageType()) => {
  assert(typeof root === 'string');
  assert(storageTypes[type], `Storage "${type}" not found`);

  const storage = new storageTypes[type](root);

  function randomAccessStorage (file) {
    return storage.create(file);
  }

  randomAccessStorage.destroy = () => storage.destroy();
  randomAccessStorage.root = root;
  randomAccessStorage.type = type;
  randomAccessStorage._storage = storage;

  return randomAccessStorage;
};
