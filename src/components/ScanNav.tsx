import React, { useState, useEffect } from "react";
import ScanProps from "../types/ScanProps";
import { CSSTransition } from "react-transition-group";

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
  const [ inProp, setIn ] = useState(false);
  useEffect(() => {
    setIn(true);
  }, []);
  return (
      <CSSTransition
        in={inProp}
        classNames="scan-nav"
        timeout={200}
      >
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
      </CSSTransition>
  );
};

export { ScanNav as default };
