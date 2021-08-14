import { promises as fs } from "fs";
import { resolve } from "path";

// Color escape sequences for logging
const COL = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

/**
 * Scrapes the scan folder and generates a manifest file  with details of all
 * the images found.
 *
 * Expects folders by date (`yyyy_mm_dd`), and scans named as
 * `PREFIX_PAGES_VERSION` where `PREFIX` is alphanumeric, `PAGES` is `00` for
 * contents pages or e.g. `09-10` for two page spreads (leading zeroes
 * optional), and `VERSION` is a four-digit index added by ScanGear.
 *
 * @param pathIn - Path to the scan directory. Defaults to `./public/scans/`.
 * @param pathOut - Output path for the manifest JSON file, including filename.
 *  Defaults to `./public/scans/`.
 */
export async function createScanManifest(
  pathIn = "./public/scans/",
  pathOut = "./public/scans/scan-manifest.json"
) {
  try {
    const scans = {};
    console.log();
    log("\u1F50D Fetching scans...");
    const dirs = await fs.readdir(pathIn);
    for (const dir of dirs) {
      if (dir.match(/^\d{4}_\d{2}_\d{2}$/)) {
        const files = await fs.readdir(`${pathIn}/${dir}`);
        scans[dir] = files;
        log(`  Added scans for ${dir}`, COL.dim);
      }
    }
    await fs.writeFile(pathOut, JSON.stringify(scans, null, 2), "utf8");
    log(`\u2705 Manifest written to`, COL.fgGreen);
    log(`    \u1F4C1 ${resolve(pathOut)}`, COL.fgCyan);
  } catch (err) {
    console.error(`\n\u274c Error reading ${pathIn}`, err);
  }
}

/**
 * Logging function with prefix and colors.
 *
 * @param msg - Message to log.
 * @param color - Optional color escape, defaults to fgWhite.
 */
function log(msg, color = COL.fgWhite) {
  console.log(`${COL.dim}[cl] : ${COL.reset}${color}${msg}${COL.reset}`);
}
createScanManifest();
