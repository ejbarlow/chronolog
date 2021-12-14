import { promises as fs } from "fs";
import { resolve } from "path";

import log from "./log.js";

/**
 * Scrapes the scan folder and generates a manifest file  with details of all
 * the images found.
 *
 * Expects folders named by volume number, subfolders by date (`yyyy_mm_dd`),
 * and scans named as `PREFIX_PAGES_VERSION` where `PREFIX` is alphanumeric,
 * `PAGES` is `00` for contents pages or e.g. `09-10` for two page spreads
 * (leading zeroes optional), and `VERSION` is a four-digit index added by
 * ScanGear.
 *
 * Each image should have a thumbnail counterpart with `_thumb` appended to
 * the filename.
 *
 * Example:
 *    pathIn/
 *    ├ 1/
 *    │ ├ 2021_06_23/
 *    │ │ ├ JRNL_12-13_0001.webp
 *    │ │ └ JRNL_12-13_0001_thumb.webp
 *    │ └ 2021_08_09/
 *    │   ├ JRNL_12-13_0001.webp
 *    │   └ JRNL_12-13_0001_thumb.webp
 *    └ 2/
 *      ├ 2021_11_08/
 *      │ ├ JRNL_102-103_0001.webp
 *      │ └ JRNL_102-103_0001_thumb.webp
 *      └ 2021_12_14/
 *        ├ JRNL_102-103_0001.webp
 *        └ JRNL_102-103_0001_thumb.webp
 *
 * @param pathIn - Path to the scan directory. Defaults to `./public/scans/`.
 * @param pathOut - Output path for the manifest JSON file, including filename.
 *  Defaults to `./public/scans/`.
 */
async function createScanManifest(
  pathIn = "./public/scans/",
  pathOut = "./public/scans/scan-manifest.json",
  scans = {}
) {
  try {
    log();
    log(`${String.fromCodePoint(0x1f50e)} Fetching scans...`);
    const vols = await fs.readdir(pathIn);
    for (let vol of vols) {
      if (vol.match(/^\d+$/)) {
        const dirs = await fs.readdir(`${pathIn}/${vol}`);
        for (let dir of dirs) {
          if (dir.match(/^\d{4}_\d{2}_\d{2}$/)) {
            scans[vol] = scans[vol] || {};
            scans[vol][dir] = await fs.readdir(`${pathIn}/${vol}/${dir}`);
            scans[vol][dir] = scans[vol][dir].filter((file) => {
              return file.indexOf("thumb") > -1 ? false : true;
            });
            log(`     Added scans for ${vol}/${dir}`, "dim");
          }
        }
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
