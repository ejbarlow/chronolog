import { createRef, useEffect, useState } from "react";
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
  const btnRef = createRef<HTMLButtonElement>();
  const containerRef = createRef<HTMLDivElement>();
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current && btnRef.current) {
        setScrollPos(
          btnRef.current.getBoundingClientRect().top -
            containerRef.current.getBoundingClientRect().top
        );
      }
    }, 50);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  }, [scrollPos]);

  return (
    <div className="overview" ref={containerRef}>
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
        .map((scan) => {
          const active = scan.pages[0] === currentScan?.pages[0];
          return (
            <button
              key={`thumb-${scan.uid}`}
              className={active ? "thumb-active" : ""}
              ref={active ? btnRef : null}
              aria-label={`Select page${
                scan.pages.length === 1
                  ? ` ${scan.pages[0]}`
                  : `s ${scan.pages.join(" & ")}`
              }`}
              onClick={() => {
                onScanSelect(scan.pages[0]);
              }}
            >
              <img src={scan.thumbPath} />
            </button>
          );
        })}
    </div>
  );
};

export { Overview as default };
