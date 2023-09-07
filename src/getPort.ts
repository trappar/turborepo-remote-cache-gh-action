import { debug } from "@actions/core";
import { port } from "./inputs";
import { getPortPromise } from "portfinder";

export async function getPort(): Promise<number> {
  if (port) {
    debug(`Using specified port: ${port}`);
    return port;
  }

  debug(`Getting available port...`);
  const freePort = await getPortPromise();
  debug(`Available port found: ${freePort}`);

  return freePort;
}
