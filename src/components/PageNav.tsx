import React, { createRef } from "react";
import ScanProps from "../types/ScanProps";
import ScanNav from "./ScanNav";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type PageNavProps = {
  scans: ScanProps[];
  page: number;
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

/**
 * A container for holding instances of ScanNav and managing transitions
 * between sets.
 *
 * @param param A thing.
 * @param param.scans The scans.
 */
const PageNav: React.FC<PageNavProps> = ({
  scans,
  onScanSelect,
  currentScan,
}) => {
  const scanNavNode = createRef<HTMLDivElement>();
  return (
    <TransitionGroup className="scan-nav">
      {scans.length && (
        <CSSTransition
          key={scans[0].uid || "0"}
          nodeRef={scanNavNode}
          timeout={200}
          classNames="nav-transition"
        >
          <ScanNav
            scans={scans}
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
