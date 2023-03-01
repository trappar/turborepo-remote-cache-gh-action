import { spawn } from "child_process";
import {
  exportVariable,
  getInput,
  saveState,
  info,
  setFailed,
  debug,
} from "@actions/core";
import { resolve } from "path";
import { waitUntilUsed } from "tcp-port-used";
import { randomBytes } from "crypto";
import getPort from "get-port";

async function main() {
  const port = await getPort();

  const storageProvider = getInput("storage-provider", {
    required: true,
    trimWhitespace: true,
  });
  const storagePath = getInput("storage-path", {
    required: true,
    trimWhitespace: true,
  });
  const teamId = getInput("team-id", { trimWhitespace: true });
  const token = randomBytes(24).toString("hex");

  exportVariable("TURBO_API", `http://127.0.0.1:${port}`);
  exportVariable("TURBO_TOKEN", token);
  exportVariable("TURBO_TEAM", teamId);

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
