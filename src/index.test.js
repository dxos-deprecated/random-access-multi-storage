//
// Copyright 2020 DxOS.
//

import { promises as fs, constants } from 'fs';
import crypto from 'crypto';
import path from 'path';

import pify from 'pify';
import del from 'del';

import { createStorage, STORAGE_RAM, STORAGE_FILE, STORAGE_IDB } from '.';

const ROOT_DIRECTORY = path.resolve(path.join(__dirname, '..', '.temp', 'index.test'));

const temp = () => path.join(ROOT_DIRECTORY, crypto.randomBytes(32).toString('hex'));

const write = async (file) => {
  const buffer = Buffer.from('test');
  await pify(file.write.bind(file))(10, buffer);
  await expect(pify(file.read.bind(file))(10, 4)).resolves.toEqual(buffer);
};

afterAll(() => del(ROOT_DIRECTORY));

describe('testing node storages', () => {
  test('create a storage with node file by default', async () => {
    const directory = temp();
    const storage = createStorage(directory);
    expect(storage.root).toBe(directory);
    expect(storage.type).toBe(STORAGE_FILE);

    // Check write a file
    const file = storage('file1');
    await write(file);
    await expect(fs.access(path.join(directory, 'file1'), constants.F_OK)).resolves.toBeUndefined();

    // Check destroy
    await storage.destroy();
    await expect(fs.access(directory, constants.F_OK)).rejects.toThrow(/ENOENT/);
  });

  test('create a storage with ram type', async () => {
    const storage = createStorage('./memory', STORAGE_RAM);
    expect(storage.root).toBe('./memory');
    expect(storage.type).toBe(STORAGE_RAM);

    const file = storage('file1');
    await write(file);
    expect(storage._storage._files.size).toBe(1);

    // Check destroy
    await storage.destroy();
    expect(storage._storage._files.size).toBe(0);
  });

  test('should throw an assert error if type not found', () => {
    expect(() => createStorage('./error', STORAGE_IDB)).toThrow(/not found/);
  });
});
