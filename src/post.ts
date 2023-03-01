import { setFailed, getState, info, debug } from "@actions/core";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { pidIsRunning } from "./pidIsRunning";
import indent from "indent-string";
import { logDir } from "./constants";

async function post() {
  const pid = parseInt(getState("pid"));

  if (pidIsRunning(pid)) {
    info(`Stopping Turbo Cache Server with PID ${pid}`);
    process.kill(pid);
  } else {
    if (isNaN(pid)) {
      setFailed(
        `Turbo Cache Server was not running. This probably indicates that the server was unable to start.`
      );
    } else {
      setFailed(
        `Turbo Cache Server with PID ${pid} was not running. This may indicate a configuration or server crash.`
      );
    }
  }

  const [out, err] = await Promise.all([
    readFile(resolve(logDir, "out.log"), "utf8").catch(() => ""),
    readFile(resolve(logDir, "err.log"), "utf8").catch(() => ""),
  ]);

  debug("Server logged the following output while running:");
  debug(indent(out, 2));

  if (err) {
    debug("Server logged the following error while running:");
    debug(indent(err, 2));
  }
}

post().catch(setFailed);
