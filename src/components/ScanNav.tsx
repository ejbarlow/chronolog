import React, { useEffect, useState, useCallback, useRef } from "react";
import ScanProps from "../types/ScanProps";

type ScanNavProps = {
  scans: ScanProps[];
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

const ScanNav = React.forwardRef<HTMLDivElement, ScanNavProps>(
  (
    { scans, onScanSelect, currentScan }: ScanNavProps,
    ref
  ): React.ReactElement => {
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPos, setScrollPos] = useState(0);

    const scrollCallback = useCallback(() => {
      if (containerRef.current && imgRef.current) {
        const offsetOuter =
          containerRef.current.getBoundingClientRect().width / 2;
        const offsetInner = imgRef.current.getBoundingClientRect().width / 2;
        setScrollPos(
          imgRef.current.getBoundingClientRect().left -
            containerRef.current.getBoundingClientRect().left -
            containerRef.current.scrollLeft -
            offsetOuter +
            offsetInner
        );
      }
    }, []);

    useEffect(() => {
      setTimeout(scrollCallback, 50);
    }, []);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
      }
    }, [scrollPos]);

    return (
      <div ref={ref} className="scan-nav-transition">
        <div ref={containerRef} className="scan-nav">
          {scans
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((scan) => {
              const active = currentScan?.uid === scan.uid;
              return (
                <img
                  key={`${scan.uid}_thumb`}
                  ref={active ? imgRef : null}
                  aria-label={`Scan thumbnail - page${scan.pages.length === 1 ? ` ${scan.pages[0]}` : `s ${scan.pages.join(' & ')}`}`}
                  className={`scan-thumbnail${
                    active ? " scan-thumbnail-active" : ""
                  }`}
                  onClick={() => {
                    onScanSelect(scan.date);
                  }}
                  src={scan.path}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

export { ScanNav as default };
