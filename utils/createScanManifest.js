/**
 * createScanManifest(pathIn,  pathOut);
 *
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

import { promises as fs } from "fs";
import { resolve } from "path";

import log from "./log.js";

async function createScanManifest(
  pathIn = "./public/scans/",
  pathOut = "./public/scans/scan-manifest.json",
  scans = {}
) {
  try {
    log();
    log(`${String.fromCodePoint(0x1f50e)} Fetching scans...`);
    const dirs = await fs.readdir(pathIn);
    for (let dir of dirs) {
      if (dir.match(/^\d{4}_\d{2}_\d{2}$/)) {
        scans[dir] = await fs.readdir(`${pathIn}/${dir}`);
        log(`     Added scans for ${dir}`, "dim");
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `\n${String.fromCodePoint(0x274c)} Error reading ${pathIn}`,
      err
    );
  }
  return { scans, pathOut };
}

createScanManifest().then(async ({ scans, pathOut }) => {
  await fs.writeFile(pathOut, JSON.stringify(scans, null, 2), "utf8");
  log(`${String.fromCodePoint(0x2705)} Manifest written to:`, "fgGreen");
  log(`     ${String.fromCodePoint(0x1f4c4)} ${resolve(pathOut)}`, "fgCyan");
});
