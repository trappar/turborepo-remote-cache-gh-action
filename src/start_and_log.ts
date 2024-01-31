import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { logDir } from "./constants.js";

const subprocess = spawn("node", [resolve(__dirname, "../server")]);

subprocess.stdout.pipe(createWriteStream(resolve(logDir, "out.log")));
subprocess.stderr.pipe(createWriteStream(resolve(logDir, "err.log")));
