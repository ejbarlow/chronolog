import path from "path";
import ScanProps from "../types/ScanProps";
import id from "./generateId";

/**
 * Fetch a JSON manifest from the provided path, parse the JSON, construct a
 * scan object for each listed scan, and return them all in an array.
 *
 * @param manifestPath Path to a JSON manifest.
 *   See ../../utils/createScanManifest.js for more information.
 * @return ScanProps[] An array containing the scan objects for all scans
 *   listed in the manifest.
 */
async function importScanDataFromManifest(manifestPath: string) {
  const response = await fetch(manifestPath);
  const data = await response.json();
  const scanRoot = path.dirname(manifestPath);
  const scans: ScanProps[] = [];
  for (const vol in data) {
    for (const date in data[vol]) {
      for (const scan in data[vol][date]) {
        const fileStr: string = data[vol][date][scan];
        const dirStr = `${scanRoot}/${vol}/${date}`;
        const [y, m, d] = date.split("_").map((num: string) => parseInt(num));
        const dateProp = new Date(y, m - 1, d);
        const [, pagesStr] = fileStr.split("_");
        const pages = pagesStr.split("-").map((num: string) => parseInt(num));
        scans.push({
          uid: id(),
          path: `${dirStr}/${fileStr}`,
          thumbPath: `${dirStr}/${fileStr.replace(/\./, "_thumb.")}`,
          volume: parseInt(vol),
          pages,
          date: dateProp,
          version: 0,
        });
      }
    }
  }
  return scans;
}

export { importScanDataFromManifest as default };
