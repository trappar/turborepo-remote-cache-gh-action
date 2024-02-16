import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import os from 'os';

const logDir = path.resolve(os.tmpdir(), 'turborepo-remote-cache-gh-action');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logFile = (name) => path.resolve(logDir, name);

export const readLog = async (name) => {
  try {
    return await fsPromises.readFile(logFile(name), 'utf8');
  } catch (e) {
    return '';
  }
};