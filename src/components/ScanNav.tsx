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
    const btnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPos, setScrollPos] = useState(0);

    const scrollCallback = useCallback(() => {
      if (containerRef.current && btnRef.current) {
        const offsetOuter =
          containerRef.current.getBoundingClientRect().width / 2;
        const offsetInner = btnRef.current.getBoundingClientRect().width / 2;
        setScrollPos(
          btnRef.current.getBoundingClientRect().left -
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
      <div ref={ref}>
        <div ref={containerRef} className="scan-nav-inner">
          {scans
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((scan, i) => {
              const active = currentScan?.uid === scan.uid;
              return (
                <button
                  key={`${scan.uid}_thumb`}
                  ref={active ? btnRef : null}
                  aria-label={`Scan ${i + 1} of ${scans.length}, page${
                    scan.pages.length === 1
                      ? ` ${scan.pages[0]}`
                      : `s ${scan.pages.join(" & ")}`
                  }`}
                  onClick={() => {
                    onScanSelect(scan.date);
                  }}
                >
                  <img
                    className={active ? "active" : ""}
                    src={scan.thumbPath}
                  />
                </button>
              );
            })}
        </div>
      </div>
    );
  }
);

export { ScanNav as default };
