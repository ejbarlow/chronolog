import path from "path";
import ScanProps from "../types/ScanProps";
import id from "./generateId";

const importScans = async (manifestPath: string) => {
  const scanRoot = path.dirname(manifestPath);
  const scans: ScanProps[] = [];
  return await fetch(manifestPath)
    .then((r) => r.json())
    .then((data) => {
      for (const date in data) {
        for (const scan in data[date]) {
          const fileStr = data[date][scan];
          const dirStr = `${scanRoot}/${date}`;
          const [y, m, d] = date.split("_").map((num: string) => parseInt(num));
          const dateProp = new Date(y, m - 1, d);
          const [, pagesStr] = fileStr.split("_");
          const pages = pagesStr.split("-").map((num: string) => parseInt(num));
          scans.push({
            uid: id(),
            path: `${dirStr}/${fileStr}`,
            pages,
            date: dateProp,
            version: 0,
          });
        }
      }
      return scans;
    });
};

export { importScans as default };
