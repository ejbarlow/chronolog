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
  const [inProp, setIn] = useState(false);
  const [displayScans, setDisplayScans] = useState(scans);

  useEffect(() => {
    setIn(false);
    setTimeout(() => {
      setDisplayScans(
        scans.filter((scan) => {
          return scan.pages.includes(page);
        })
      );
    }, 100);
    setTimeout(() => {
      setIn(true);
    }, 200);
  }, [scans, page]);

  const scanNavNode = useRef(null);

  return (
    <CSSTransition
      in={inProp}
      classNames="scan-nav"
      timeout={100}
      nodeRef={scanNavNode}
    >
      <div ref={scanNavNode} className="scan-nav">
        {displayScans.map((scan) => {
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
