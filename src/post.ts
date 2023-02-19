import { setFailed, getState, info } from "@actions/core";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { getLogDir } from "./utils/getLogDir";
import { pidIsRunning } from "./utils/pidIsRunning";
import indent from "indent-string";

async function post() {
  const pid = parseInt(getState("pid"));

  if (pidIsRunning(pid)) {
    info(`Stopping Turbo Cache Server with PID ${pid}`);
    process.kill(pid);
  } else {
    setFailed(
      `Turbo Cache Server with PID ${pid} was not running. This may indicate a configuration or server crash.`
    );
  }

  const logDir = getLogDir();
  const [out, err] = await Promise.all([
    readFile(resolve(logDir, "out.log"), "utf8").catch(() => ""),
    readFile(resolve(logDir, "err.log"), "utf8").catch(() => ""),
  ]);

  info("Server logged the following output while running:");
  info(indent(out, 2));

  if (err) {
    info("Server logged the following error while running:");
    info(indent(err, 2));
  }
}

post().catch(setFailed);
