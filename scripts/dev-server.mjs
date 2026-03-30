import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";

const cwd = process.cwd();
const lockPath = join(cwd, ".next", "dev", "lock");

function getLockOwners() {
  const result = spawnSync("lsof", [lockPath], {
    cwd,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return [];
  }

  return result.stdout
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean);
}

if (existsSync(lockPath)) {
  const owners = getLockOwners();

  if (owners.length === 0) {
    rmSync(lockPath, { force: true });
    console.log("Removed stale .next/dev/lock before starting dev server.");
  } else {
    console.error("Another `next dev` process already owns .next/dev/lock.");
    console.error("Stop the existing dev server first, then retry.");
    process.exit(1);
  }
}

const nextBin = join(cwd, "node_modules", ".bin", "next");
const child = spawn(nextBin, ["dev", ...process.argv.slice(2)], {
  cwd,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
