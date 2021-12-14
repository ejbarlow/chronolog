import React from "react";
import ScanProps from "../types/ScanProps";

type ScanImageProps = {
  scan: ScanProps;
};

/**
 * Takes a scan and HTMLImageElement ref (used for transitions) and returns
 * the image element for display.
 */
const ScanImage = React.forwardRef<HTMLImageElement, ScanImageProps>(
  ({ scan }: ScanImageProps, ref): React.ReactElement => {
    return (
      <img
        ref={ref}
        aria-label={`Scan image, page${
          scan.pages.length === 1
            ? ` ${scan.pages[0]}`
            : `s ${scan.pages.join(" & ")}`
        }`}
        src={scan.path.toString()}
      />
    );
  }
);

export { ScanImage as default };
