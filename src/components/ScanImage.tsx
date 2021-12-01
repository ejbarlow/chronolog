import React from "react";
import ScanProps from "../types/ScanProps";

type ScanImageProps = {
  scan: ScanProps;
};

const ScanImage = React.forwardRef<HTMLDivElement, ScanImageProps>(
  ({ scan }: ScanImageProps, ref): React.ReactElement => {
    return (
      <div ref={ref} className="scan-image">
        <img src={scan.path.toString()} />
      </div>
    );
  }
);

export { ScanImage as default };
