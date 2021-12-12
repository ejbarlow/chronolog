import React, { createRef, useEffect, useState } from "react";
import ScanProps from "../types/ScanProps";

type OverviewProps = {
  scans: ScanProps[];
  currentScan?: ScanProps;
  onScanSelect: (page: number) => void;
};

/**
 * Display scans in a grid, passing back the page number when one is selected.
 * If provided, `currentScan` is used to apply the `active` class to the
 * relevant thumbnail.
 */
const Overview: React.FC<OverviewProps> = ({
  scans,
  currentScan,
  onScanSelect,
}) => {
  const btnRef = createRef<HTMLButtonElement>();
  const containerRef = createRef<HTMLDivElement>();
  const [scrollPos, setScrollPos] = useState(0);

  // Set the scroll position to show the active page on load.
  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current && btnRef.current) {
        setScrollPos(
          btnRef.current.getBoundingClientRect().top -
            containerRef.current.getBoundingClientRect().top
        );
      }
    }, 50);
  }, []);

  // Scroll whenever scroll position is udpated.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  }, [scrollPos]);

  /**
   * Given an array of scans, returns an array containing only the most
   * recent scan of each page, sorted by page number.
   *
   * @param scans An array containing any scans to be processed.
   * @return ScanProps[] An array containing the most recent scan of each page,
   *   in page number order.
   */
  const getFilteredScans = (scans: ScanProps[]): ScanProps[] => {
    // Sort all by date
    return (
      scans
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        // Take only the newest version of each page
        .reduce<ScanProps[]>((pageScans, scan) => {
          return pageScans.find(
            (checkScan) => scan.pages[0] === checkScan.pages[0]
          ) === undefined
            ? [...pageScans, scan]
            : pageScans;
        }, [])
        // Sort by page number
        .sort((a, b) => (a.pages[0] > b.pages[0] ? 1 : -1))
    );
  };

  /**
   * Returns the thumbnail button for a given scan.
   *
   * @param scan The scan object for which to generate a thumbnail.
   * @return JSX.Element A button with props taken from the scan containing its
   *   thumbnail image.
   */
  const thumbnailButton = (scan: ScanProps) => {
    // Use page numbers to match the current page in the app state, as
    // the overview always shows the newest scan of each page.
    const active = scan.pages[0] === currentScan?.pages[0];
    const ariaLabel = `Select page${
      scan.pages.length === 1
        ? ` ${scan.pages[0]}`
        : `s ${scan.pages.join(" & ")}`
    }`;
    const clickHandler = () => {
      onScanSelect(scan.pages[0]);
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
    <div className="overview" ref={containerRef}>
      {getFilteredScans(scans).map((scan) => thumbnailButton(scan))}
    </div>
  );
};

export { Overview as default };
