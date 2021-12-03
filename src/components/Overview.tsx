import ScanProps from "../types/ScanProps";

type OverviewProps = {
  scans: ScanProps[];
  onScanSelect: (page: number) => void;
};

const Overview = ({
  scans,
  onScanSelect,
}: OverviewProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        gridTemplateRows: "repeat(9, 1fr)",
        gridTemplateColumns: "repeat(9, 1fr)",
        gridGap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
            onClick={() => {
              onScanSelect(scan.pages[0]);
            }}
            src={scan.thumbPath}
            style={{
              cursor: "pointer",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        ))}
    </div>
  );
};

export { Overview as default };
