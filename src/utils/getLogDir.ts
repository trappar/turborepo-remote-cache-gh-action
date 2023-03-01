import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import os from "os";

export const getLogDir = () => {
  const logDir = resolve(
    os.tmpdir(),
    "turborepo-remote-cache-gh-action",
    "logs"
  );

  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  return logDir;
};
