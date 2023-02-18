import { spawn } from "child_process";
import {
  exportVariable,
  getInput,
  saveState,
  info,
  setFailed,
} from "@actions/core";
import { resolve } from "path";
import { waitUntilUsed } from "tcp-port-used";

async function main() {
  const port = parseInt(
    getInput("port", {
      required: true,
      trimWhitespace: true,
    })
  );

  const storageProvider = getInput("storage-provider", {
    required: true,
    trimWhitespace: true,
  });
  const storagePath = getInput("storage-path", {
    required: true,
    trimWhitespace: true,
  });
  const teamId = getInput("team-id", { trimWhitespace: true });
  const turboToken = process.env.TURBO_TOKEN || "turbo-token";

  exportVariable("TURBO_API", `http://127.0.0.1:${port}`);
  exportVariable("TURBO_TOKEN", turboToken);
  exportVariable("TURBO_TEAM", `team_${teamId}`);

  const subprocess = spawn("node", [resolve(__dirname, "../start_and_log")], {
    detached: true,
    stdio: "ignore",
    env: {
      ...process.env,
      PORT: port.toString(),
      TURBO_TOKEN: turboToken,
      STORAGE_PROVIDER: storageProvider,
      STORAGE_PATH: storagePath,
    },
  });
  const pid = subprocess.pid?.toString();

  subprocess.unref();

  try {
    await waitUntilUsed(port, 500, 20000);

    info("Spawned Turbo Cache Server:");
    info(`  PID: ${pid}`);
    info(`  Listening on port: ${port}`);
    saveState("pid", subprocess.pid?.toString());
  } catch (e) {
    throw new Error(`Turbo server failed to start on port: ${port}`);
  }
}

main().catch(setFailed);
