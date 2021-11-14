import React, { useState, useEffect, useRef } from "react";
import ScanProps from "../types/ScanProps";
import { CSSTransition } from "react-transition-group";

type ScanNavProps = {
  scans: ScanProps[];
  page: number;
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

const ScanNav = ({
  scans,
  page,
  onScanSelect,
  currentScan,
}: ScanNavProps): React.ReactElement => {
  const [displayScans, setDisplayScans] = useState<ScanProps[]>([]);
  useEffect(() => {
    setDisplayScans(scans.filter((scan) => scan.pages.includes(page)));
  }, [scans, page]);
  return (
    <div className="scan-nav">
      {displayScans
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .map((scan) => {
          const active = currentScan === scan;
          return (
            <div
              key={`${scan.uid}_thumb`}
              className={`scan-thumbnail${
                active ? " scan-thumbnail-active" : ""
              }`}
              onClick={() => {
                onScanSelect(scan.date);
              }}
            >
              <img src={scan.path} />
            </div>
          );
        })}
    </div>
  );
};

export { ScanNav as default };
