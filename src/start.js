import {
  debug,
  exportVariable,
  info,
  saveState,
  setFailed,
} from '@actions/core';
import getFreePort from 'get-port';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { waitUntilUsedOnHost } from 'tcp-port-used';
import { indentMultiline } from './indentMultiline.js';
import { host, port, storagePath, storageProvider, teamId, token } from './inputs.js';
import { readLog } from './logs.js';

async function getPort() {
  if (port) {
    debug(`Using specified port: ${port}`);
    return port;
  }

  debug('Getting available port...');
  const freePort = await getFreePort();
  debug(`Available port found: ${freePort}`);

  return freePort;
}

async function main() {
  const port = await getPort();

  debug('Starting Turbo Cache Server...');
  const subprocess = spawn(
    'node',
    [resolve(process.cwd(), 'dist/server/index.cjs')],
    {
      detached: true,
      stdio: 'ignore',
      env: {
        ...process.env,
        HOST: host,
        PORT: port.toString(),
        TURBO_TOKEN: token,
        STORAGE_PROVIDER: storageProvider,
        STORAGE_PATH: storagePath,
      },
    },
  );

  const pid = subprocess.pid?.toString();
  subprocess.unref();

  try {
    debug(`Waiting for port ${port} to be used...`);
    await waitUntilUsedOnHost(port, host, 250, 5000);
    info('Spawned Turbo Cache Server:');
    info(`  PID: ${pid}`);
    info(`  Listening on port: ${port}`);
    saveState('pid', subprocess.pid?.toString());

    debug('Export environment variables...');
    exportVariable('TURBO_API', `http://${host}:${port}`);
    exportVariable('TURBO_TOKEN', token);
    exportVariable('TURBO_TEAM', teamId);
  } catch (e) {
    const errors = await readLog('err');
    const errorMessage = errors ? `\nErrors: ${indentMultiline(errors)}` : '';
    throw new Error(`Turbo server failed to start on port: ${port}${errorMessage}`);
  }
}

main().catch(setFailed);
