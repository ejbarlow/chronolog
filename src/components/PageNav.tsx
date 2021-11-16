import React, { useState, useEffect, createRef } from "react";
import ScanProps from "../types/ScanProps";
import ScanNav from "./ScanNav";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type PageNavProps = {
  scans: ScanProps[];
  page: number;
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

const PageNav = ({
  scans,
  page,
  onScanSelect,
  currentScan,
}: PageNavProps): React.ReactElement => {
  const [displayScans, setDisplayScans] = useState<ScanProps[]>([]);
  useEffect(() => {
    setDisplayScans(scans.filter((scan) => scan.pages.includes(page)));
  }, [scans, page]);
  const scanNavNode = createRef<HTMLDivElement>();
  return (
    <TransitionGroup className="scan-nav-group">
      {displayScans.length && (
        <CSSTransition
          key={displayScans[0].uid || "0"}
          nodeRef={scanNavNode}
          timeout={200}
          classNames="fade"
        >
          <ScanNav
            scans={displayScans}
            page={page}
            onScanSelect={onScanSelect}
            currentScan={currentScan}
            ref={scanNavNode}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export { PageNav as default };
