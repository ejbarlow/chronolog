import React from "react";
import ScanProps from "../types/ScanProps";

type ScanImageProps = {
  scan: ScanProps;
};

const ScanImage = React.forwardRef<HTMLImageElement, ScanImageProps>(
  ({ scan }: ScanImageProps, ref): React.ReactElement => {
    return <img ref={ref} className="scan-image" src={scan.path.toString()} />;
  }
);

export { ScanImage as default };
