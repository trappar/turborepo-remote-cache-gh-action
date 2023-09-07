import { getInput } from "@actions/core";
import { randomBytes } from "crypto";

function convertToNumber(value: string | undefined, defaultValue: number) {
  return value && !isNaN(+value) ? +value : defaultValue;
}

export const storageProvider = getInput("storage-provider", {
  required: true,
  trimWhitespace: true,
});
export const storagePath = getInput("storage-path", {
  required: true,
  trimWhitespace: true,
});
export const teamId = getInput("team-id", { trimWhitespace: true });
export const token = randomBytes(24).toString("hex");
export const host = getInput("host", { trimWhitespace: true });
export const port = parseInt(getInput("port", { trimWhitespace: true }));
export const retryTimeMs = convertToNumber(
  getInput("port-retry-time-ms", { trimWhitespace: true }),
  250
);
export const timeoutMs = convertToNumber(
  getInput("port-timeout-ms", { trimWhitespace: true }),
  5000
);
