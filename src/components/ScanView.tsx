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

// For dynamic background color.
const fac = new FastAverageColor();

/**
 * A container for managing transitions between instances of ScanImage.
 */
const ScanView = ({
  currentScan,
  page,
  styleCallback,
}: ScanViewProps): React.ReactElement => {
  // Class set on the parent to determine the direction of transition
  const [scanDir, setScanDir] = useState("scan-view--static");
  const [displayPage, setDisplayPage] = useState(page);
  const scanViewNode = createRef<HTMLImageElement>();
  useEffect(() => {
    // Set transition direction based on page number.
    const transitionDir =
      page > displayPage ? "left" : page < displayPage ? "right" : "static";
    setScanDir(`scan-view--${transitionDir}`);
    setDisplayPage(page);
    // Update the dynamic background
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
