import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import os from "os";
import { debug } from "@actions/core";

export const getLogDir = () => {
  const logDir = resolve(
    os.tmpdir(),
    "turborepo-remote-cache-gh-action",
    "logs"
  );

  if (!existsSync(logDir)) {
    debug(`Creating log directory: "${logDir}"...`);
    mkdirSync(logDir);
  }

  return logDir;
};
