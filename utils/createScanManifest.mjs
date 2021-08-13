import { promises as fs } from "fs";

/**
 * Scrapes the scan folder and generates a
 * manifest file  with details of all the images
 * found.
 *
 * Expects folders by date (`yyyy_mm_dd.jpg`), and
 * scans named as...
 * `PREFIX_PAGES_VERSION`
 * ...where `PREFIX` is alphanumeric, `PAGES` is
 * `00` for contents pages or e.g. `09-10` for
 * two page spreads, and version is a four digit
 * index added by ScanGear.
 *
 * @param pathIn - Path to the scan directory.
 * @param pathOut - Output path for the manifest
 *  JSON file, including filename.
 */
async function createScanManifest(
  pathIn = "./public/scans/",
  pathOut = "./public/scans/scan-manifest.json"
) {
  try {
    const scans = {};
    const dirs = await fs.readdir(pathIn);
    for (const dir of dirs) {
      if (dir.match(/^\d{4}_\d{2}_\d{2}$/)) {
        scans[dir] = dir;
      }
    }
    console.log(scans);
    console.log(pathOut);
  } catch (err) {
    console.error(`Error reading ${pathIn}.`, err);
  }
}

createScanManifest();
