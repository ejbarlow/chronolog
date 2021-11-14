import React, { createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScanProps from "../types/ScanProps";
import ScanImage from "./ScanImage";

type ScanViewProps = {
  scans: ScanProps[];
  page: number;
  date: Date;
};

const ScanView = ({ scans, page, date }: ScanViewProps): React.ReactElement => {
  const scan = scans
    .filter((scan) => scan.pages.includes(page))
    .reduce((closest, curr) => {
      return Math.abs(curr.date.getTime() - date.getTime()) <
        Math.abs(closest.date.getTime() - date.getTime()) &&
        curr.pages.includes(page)
        ? curr
        : closest;
    });
  const scanViewNode = createRef<HTMLDivElement>();
  return (
    <TransitionGroup className="scan-view">
      <CSSTransition
        key={scan.uid}
        nodeRef={scanViewNode}
        timeout={200}
        classNames="fade"
      >
        <ScanImage scan={scan} ref={scanViewNode} />
      </CSSTransition>
    </TransitionGroup>
  );
};

export { ScanView as default };
