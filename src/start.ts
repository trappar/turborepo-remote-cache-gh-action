import { spawn } from "child_process";
import { saveState, info, setFailed, debug } from "@actions/core";
import { resolve } from "path";
import { waitUntilUsed } from "tcp-port-used";
import getPort from "get-port";
import { existsSync, mkdirSync } from "fs";
import { logDir } from "./constants";
import { storagePath, storageProvider, token } from "./inputs";

async function main() {
  if (!existsSync(logDir)) {
    debug(`Creating log directory: "${logDir}"...`);
    mkdirSync(logDir, { recursive: true });
  }

  debug(`Getting available port...`);
  const port = await getPort();
  debug(`Available port found: ${port}`);

  debug(`Starting Turbo Cache Server...`);
  const subprocess = spawn("node", [resolve(__dirname, "../start_and_log")], {
    detached: true,
    stdio: "ignore",
    env: {
      ...process.env,
      PORT: port.toString(),
      TURBO_TOKEN: token,
      STORAGE_PROVIDER: storageProvider,
      STORAGE_PATH: storagePath,
    },
  });

  const pid = subprocess.pid?.toString();
  subprocess.unref();

  try {
    debug(`Waiting for port ${port} to be used...`);
    await waitUntilUsed(port, 250, 5000);

    info("Spawned Turbo Cache Server:");
    info(`  PID: ${pid}`);
    info(`  Listening on port: ${port}`);
    saveState("pid", subprocess.pid?.toString());
  } catch (e) {
    throw new Error(`Turbo server failed to start on port: ${port}`);
  }
}

main().catch(setFailed);
