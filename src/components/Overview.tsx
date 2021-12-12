import React, { createRef, useEffect, useState } from "react";
import ScanProps from "../types/ScanProps";

type OverviewProps = {
  scans: ScanProps[];
  currentScan?: ScanProps;
  onScanSelect: (page: number) => void;
};

const Overview: React.FC<OverviewProps> = ({
  scans,
  currentScan,
  onScanSelect,
}) => {
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
        // Sort all by date
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        // Take only the newest version of each page
        .reduce<ScanProps[]>((pageScans, scan) => {
          return pageScans.find(
            (checkScan) => scan.pages[0] === checkScan.pages[0]
          ) === undefined
            ? [...pageScans, scan]
            : pageScans;
        }, [])
        // Sort by page number
        .sort((a, b) => (a.pages[0] > b.pages[0] ? 1 : -1))
        .map((scan) => {
          const active = scan.pages[0] === currentScan?.pages[0];
          const ariaLabel = `Select page${
            scan.pages.length === 1
              ? ` ${scan.pages[0]}`
              : `s ${scan.pages.join(" & ")}`
          }`;
          const clickHandler = () => {
            onScanSelect(scan.pages[0]);
          };

          return (
            <button
              key={`thumb-${scan.uid}`}
              className={active ? "active" : ""}
              ref={active ? btnRef : null}
              aria-label={ariaLabel}
              onClick={clickHandler}
            >
              <img src={scan.thumbPath} />
            </button>
          );
        })}
    </div>
  );
};

export { Overview as default };
