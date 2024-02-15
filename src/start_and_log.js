import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { logFile } from './logs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const subprocess = spawn('node', [resolve(__dirname, '..', 'server', 'index.cjs')]);

subprocess.stdout.pipe(createWriteStream(logFile('out')));
subprocess.stderr.pipe(createWriteStream(logFile('err')));