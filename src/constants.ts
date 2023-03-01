import { resolve } from "path";
import os from "os";

export const logDir = resolve(os.tmpdir(), "turborepo-remote-cache-gh-action");
