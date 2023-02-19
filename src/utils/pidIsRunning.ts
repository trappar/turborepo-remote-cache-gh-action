export function pidIsRunning(pid: number) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}