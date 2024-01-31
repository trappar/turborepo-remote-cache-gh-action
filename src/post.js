import { debug, getState, info, setFailed } from '@actions/core';
import { indentMultiline } from './indentMultiline.js';
import { readLog } from './logs.js';

function pidIsRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}

async function post() {
  const pid = parseInt(getState('pid'));

  if (pidIsRunning(pid)) {
    info(`Stopping Turbo Cache Server with PID ${pid}`);
    process.kill(pid);
  } else {
    if (isNaN(pid)) {
      setFailed(
        'Turbo Cache Server was not running. This probably indicates that the server was unable to start.',
      );
    } else {
      setFailed(
        `Turbo Cache Server with PID ${pid} was not running. This may indicate a configuration or server crash.`,
      );
    }
  }

  const [out, err] = await Promise.all([readLog('out'), readLog('err')]);

  debug('Server logged the following output while running:');
  debug(indentMultiline(out));

  if (err) {
    debug('Server logged the following error while running:');
    debug(indentMultiline(err));
  }
}

post().catch(setFailed);
