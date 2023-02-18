import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

export const getLogDir = () => {
  const logDir = resolve(process.cwd(), "log");

  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  return logDir;
};
