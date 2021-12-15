import React, { useEffect, useState, useRef } from "react";
import ScanProps from "../types/ScanProps";

type ScanNavProps = {
  scans: ScanProps[];
  onScanSelect: (val: Date) => void;
  currentScan?: ScanProps;
};

/**
 * Takes an array of scans and returns a group of buttons for navigating
 * between them.
 */
const ScanNav = React.forwardRef<HTMLDivElement, ScanNavProps>(
  (
    { scans, onScanSelect, currentScan }: ScanNavProps,
    ref
  ): React.ReactElement => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
      /**
       * Scroll to active on load.
       */
      setTimeout(() => {
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
      }, 50);
      /**
       * Horizontal scrolling on mouse wheel.
       */
      containerRef.current?.addEventListener("wheel", (e) => {
        if (containerRef.current) {
          e.preventDefault();
          containerRef.current.scrollLeft += e.deltaY;
        }
      });
    }, []);

    /**
     * Activate the scroll whenever the position is updated
     */
    useEffect(() => {
      containerRef.current?.scrollTo({ left: scrollPos, behavior: "auto" });
    }, [scrollPos]);

    /**
     * Returns the thumbnail button for a given scan.
     *
     * @param scan The scan object for which to generate a thumbnail.
     * @return JSX.Element A button with props taken from the scan containing its
     *   thumbnail image.
     */
    const thumbnailButton = (scan: ScanProps) => {
      const active = scan.uid === currentScan?.uid;
      const ariaLabel = `Select scan from ${scan.date}`;
      const clickHandler = () => {
        onScanSelect(scan.date);
      };

      return (
        <button
          key={`thumb-${scan.uid}`}
          className={active ? "active" : ""}
          ref={active ? btnRef : null}
          aria-label={ariaLabel}
          onClick={clickHandler}
        >
          <img src={scan.thumbPath} />
        </button>
      );
    };

    return (
      <div className="scan-nav" ref={ref}>
        <div ref={containerRef} className="scan-nav-inner">
          {scans
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((scan) => thumbnailButton(scan))}
        </div>
      </div>
    );
  }
);

export { ScanNav as default };
