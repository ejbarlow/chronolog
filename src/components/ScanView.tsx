import React, { createRef, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScanProps from "../types/ScanProps";
import ScanImage from "./ScanImage";

type ScanViewProps = {
  scans: ScanProps[];
  volume: number;
  page: number;
  date: Date;
};

const ScanView = ({
  scans,
  page,
  date,
  volume,
}: ScanViewProps): React.ReactElement => {
  const [scanDir, setScanDir] = useState("scan-view--left");
  const [displayPage, setDisplayPage] = useState(page);
  const scan = scans
    .filter(
      (scan) => scan.pages.includes(displayPage) && scan.volume === volume
    )
    .reduce((closest, curr) => {
      return Math.abs(curr.date.getTime() - date.getTime()) <
        Math.abs(closest.date.getTime() - date.getTime()) &&
        curr.pages.includes(displayPage)
        ? curr
        : closest;
    });
  const scanViewNode = createRef<HTMLDivElement>();
  useEffect(() => {
    setScanDir(`scan-view--${page > displayPage ? "left" : "right"}`);
    setDisplayPage(page);
  }, [page]);
  return (
    <TransitionGroup className={`scan-view ${scanDir}`}>
      <CSSTransition
        key={scan.uid}
        nodeRef={scanViewNode}
        timeout={200}
        classNames="scan-transition"
      >
        <ScanImage scan={scan} ref={scanViewNode} />
      </CSSTransition>
    </TransitionGroup>
  );
};

export { ScanView as default };
