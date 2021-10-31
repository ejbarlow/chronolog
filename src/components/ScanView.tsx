import React, { useEffect, useState } from "react";
import ScanProps from "../types/ScanProps";

type ScanViewProps = {
  scan: ScanProps;
};

const ScanView = ({ scan }: ScanViewProps): React.ReactElement => {
  const [displayScan, setDisplayScan] = useState(scan);
  const [mainClasses, setMainClasses] = useState(["scan-main"]);

  useEffect(() => {
    const classes = ["scan-main"];
    classes.push(
      scan.pages[0] < displayScan.pages[0]
        ? "scan-main--left"
        : "scan-main--right"
    );
    setMainClasses(classes);
    setDisplayScan(scan);
  }, [scan]);

  return (
    <div className="scan-view">
      <img
        className={mainClasses.join(" ")}
        src={displayScan.path.toString()}
      />
      <img className="scan-transition" src={scan.path.toString()} />
    </div>
  );
};

export { ScanView as default };
