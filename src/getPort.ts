import { debug } from "@actions/core";
import { port } from "./inputs.js";
import getFreePort from "get-port";

export async function getPort(): Promise<number> {
  if (port) {
    debug(`Using specified port: ${port}`);
    return port;
  }

  debug(`Getting available port...`);
  const freePort = await getFreePort();
  debug(`Available port found: ${freePort}`);

  return freePort;
}
