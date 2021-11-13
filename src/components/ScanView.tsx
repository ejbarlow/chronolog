import React, { createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScanProps from "../types/ScanProps";
import ScanImage from "./ScanImage";

type ScanViewProps = {
  scan: ScanProps;
};

const ScanView = ({ scan }: ScanViewProps): React.ReactElement => {
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
