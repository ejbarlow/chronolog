import React, { createRef, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScanProps from "../types/ScanProps";
import ScanImage from "./ScanImage";
import FastAverageColor from "fast-average-color";

type ScanViewProps = {
  currentScan?: ScanProps;
  page: number;
  styleCallback?: (arg0: string) => void;
};

const fac = new FastAverageColor();

const ScanView = ({
  currentScan,
  page,
  styleCallback,
}: ScanViewProps): React.ReactElement => {
  const [scanDir, setScanDir] = useState("scan-view--left");
  const [displayPage, setDisplayPage] = useState(page);
  const scanViewNode = createRef<HTMLImageElement>();
  useEffect(() => {
    const transitionDir =
      page > displayPage ? "left" : page < displayPage ? "right" : "static";
    setScanDir(`scan-view--${transitionDir}`);
    setDisplayPage(page);
    if (styleCallback && currentScan) {
      fac.getColorAsync(currentScan.path).then((color) => {
        styleCallback(color.hex);
      });
    }
  }, [currentScan]);
  return (
    <TransitionGroup className={`scan-view ${scanDir}`}>
      {currentScan && (
        <CSSTransition
          key={currentScan.uid}
          appear={true}
          nodeRef={scanViewNode}
          timeout={100}
          classNames="scan-transition"
        >
          <ScanImage scan={currentScan} ref={scanViewNode} />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export { ScanView as default };
