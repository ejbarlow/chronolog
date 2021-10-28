import React from "react";
import ScanProps from "../types/ScanProps";

type ScanNavProps = {
  scans: ScanProps[];
  onScanSelect: (val: Date) => void;
}

const ScanNav = ({ scans, onScanSelect }: ScanNavProps): React.ReactElement => {
  return (
    <div className="scan-nav">
      {scans.map(
            (scan) => (
                <div
                  key={`${scan.uid}_thumb`}
                  className="scan-thumbnail"
                  onClick={() => {
                    onScanSelect(scan.date);
                  }}
                >
                  <img src={scan.path} />
                </div>
  ))}
        </div>
)
}

export { ScanNav as default }
