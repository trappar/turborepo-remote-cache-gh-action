import { getInput } from "@actions/core";
import { randomBytes } from "crypto";

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
