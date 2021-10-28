import React, { useEffect, useState } from "react";
import ScanProps from "../types/ScanProps";
import { SwitchTransition, CSSTransition } from "react-transition-group";

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
  const [transitionFlag, setFlag] = useState(false);
  useEffect(() => {
    setFlag(!transitionFlag);
  }, [scans]);
  return (
    <SwitchTransition>
      <CSSTransition
        key={transitionFlag ? "in" : "out"}
        addEndListener={(node, done) => {
          node.addEventListener("transitioned", done, false);
        }}
        className="scan-nav"
      >
        <div>
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
    </SwitchTransition>
  );
};

export { ScanNav as default };
