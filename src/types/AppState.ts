import ScanProps from "./ScanProps";

type AppState = {
  scans: ScanProps[];
  highestPage: number;
  page: number;
  date: Date;
};

export type { AppState as default };
