import React, { useState, useEffect } from "react";
import ScanProps from "../types/ScanProps";

type ScanNavProps = {
  scans: ScanProps[];
  page: number;
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

const ScanNav = React.forwardRef<HTMLDivElement, ScanNavProps>(
  (
    { scans, page, onScanSelect, currentScan }: ScanNavProps,
    ref
  ): React.ReactElement => {
    const [displayScans, setDisplayScans] = useState<ScanProps[]>([]);
    useEffect(() => {
      setDisplayScans(scans.filter((scan) => scan.pages.includes(page)));
    }, [scans, page]);
    return (
      <div ref={ref} className="scan-nav">
        {displayScans
          .sort((a, b) => (a.date > b.date ? 1 : -1))
          .map((scan) => {
            const active = currentScan?.uid === scan.uid;
            return (
              <img
                key={`${scan.uid}_thumb`}
                className={`scan-thumbnail${
                  active ? " scan-thumbnail-active" : ""
                }`}
                onClick={() => {
                  onScanSelect(scan.date);
                }}
                src={scan.path}
              />
            );
          })}
      </div>
    );
  }
);

export { ScanNav as default };
