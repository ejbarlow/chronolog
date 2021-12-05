import ScanProps from "../types/ScanProps";

type OverviewProps = {
  scans: ScanProps[];
  currentScan?: ScanProps;
  onScanSelect: (page: number) => void;
};

const Overview = ({
  scans,
  currentScan,
  onScanSelect,
}: OverviewProps): React.ReactElement => {
  return (
    <div className="overview">
      {scans
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .reduce<ScanProps[]>((pageScans, scan) => {
          return pageScans.find(
            (checkScan) => scan.pages[0] === checkScan.pages[0]
          ) === undefined
            ? [...pageScans, scan]
            : pageScans;
        }, [])
        .sort((a, b) => (a.pages[0] > b.pages[0] ? 1 : -1))
        .map((scan) => (
          <img
            key={`thumb-${scan.uid}`}
            className={
              scan.pages[0] === currentScan?.pages[0] ? "thumb-active" : ""
            }
            onClick={() => {
              onScanSelect(scan.pages[0]);
            }}
            src={scan.thumbPath}
          />
        ))}
    </div>
  );
};

export { Overview as default };
