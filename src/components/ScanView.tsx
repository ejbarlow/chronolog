import React, { createRef, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScanProps from "../types/ScanProps";
import ScanImage from "./ScanImage";
import FastAverageColor from "fast-average-color";

type ScanViewProps = {
  scans: ScanProps[];
  volume: number;
  page: number;
  date: Date;
  styleCallback?: (arg0: string) => void;
};

const fac = new FastAverageColor();

const ScanView = ({
  scans,
  page,
  date,
  volume,
  styleCallback,
}: ScanViewProps): React.ReactElement => {
  const [scanDir, setScanDir] = useState("scan-view--left");
  const [displayPage, setDisplayPage] = useState(page);
  const [displayVol, setDisplayVol] = useState(volume);
  const scan = scans
    .filter(
      (scan) => scan.pages.includes(displayPage) && scan.volume === displayVol
    )
    .reduce((closest, curr) => {
      return Math.abs(curr.date.getTime() - date.getTime()) <
        Math.abs(closest.date.getTime() - date.getTime()) &&
        curr.pages.includes(displayPage)
        ? curr
        : closest;
    });
  const scanViewNode = createRef<HTMLImageElement>();
  useEffect(() => {
    setScanDir(`scan-view--${page > displayPage ? "left" : "right"}`);
    setDisplayPage(page);
  }, [page]);
  useEffect(() => {
    setDisplayVol(volume);
  }, [volume]);
  useEffect(() => {
    if (styleCallback) {
      fac.getColorAsync(scan.path).then((color) => {
        styleCallback(color.hex);
      });
    }
  }, [displayPage]);
  return (
    <TransitionGroup className={`scan-view ${scanDir}`}>
      <CSSTransition
        key={scan.uid}
        appear={true}
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
