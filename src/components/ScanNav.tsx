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
    const classes = ["scan-nav"];

    if (
      containerRef.current &&
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    ) {
      classes.push("scroll");
    }

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
          containerRef.current.scrollTop += e.deltaY;
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
    const thumbnailButton = ({ uid, date, thumbPath }: ScanProps) => {
      // Sensible date for the aria-label.
      const fDate = date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const active = uid === currentScan?.uid;
      const clickHandler = () => {
        onScanSelect(date);
      };

      return (
        <button
          key={`thumb-${uid}`}
          className={active ? "active" : ""}
          ref={active ? btnRef : null}
          aria-label={`Select scan from ${fDate}`}
          onClick={clickHandler}
        >
          <img src={thumbPath} />
        </button>
      );
    };

    return (
      <div className={classes.join(" ")} ref={ref}>
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
