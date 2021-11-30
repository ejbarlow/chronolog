import ScanProps from "./ScanProps";

type AppState = {
  scans: ScanProps[];
  manifestPath: string;
  volume: number;
  highestPage: number;
  page: number;
  date: Date;
};

export type { AppState as default };
