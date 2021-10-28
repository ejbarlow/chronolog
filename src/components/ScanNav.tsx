import React, { useEffect, useState } from "react";
import ScanProps from "../types/ScanProps";

type ScanNavProps = {
  scans: ScanProps[];
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

const ScanNav = ({
  scans,
  onScanSelect,
  currentScan,
}: ScanNavProps): React.ReactElement => {
  return (
    <div className="scan-nav">
      {scans.map((scan) => {
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
