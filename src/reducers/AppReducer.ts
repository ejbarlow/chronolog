import AppState from "../types/AppState";
import { Action, ActionType } from "../types/Actions";
import ScanProps from "../types/ScanProps";

const AppReducer = (state: AppState, action: ActionType): AppState => {
  let page;
  switch (action.type) {
    /**
     * Set, increment and decrement page number.
     */
    case Action.PAGE_SET:
      page = Math.min(Math.max(action.payload, 0), state.highestPage);
      return {
        ...state,
        page,
        currentScan: findScan(state.scans, page, state.volume, state.date),
      };

    case Action.PAGE_ADD:
      page = Math.min(state.page + 2, state.highestPage);
      return {
        ...state,
        page,
        currentScan: findScan(state.scans, page, state.volume, state.date),
      };

    case Action.PAGE_SUB:
      page = Math.max(state.page - 2, 0);
      return {
        ...state,
        page,
        currentScan: findScan(state.scans, page, state.volume, state.date),
      };

    /**
     * Set the volume number.
     */
    case Action.VOL_SET:
      const volScans = state.scans.filter(
        (scan) => scan.volume === action.payload
      );
      if (!volScans.length) return state;
      const volHighest = getHighestPage(volScans);
      const newPage = Math.min(volHighest, state.page);
      return {
        ...state,
        volume: action.payload,
        highestPage: volHighest,
        page: newPage,
        currentScan: findScan(volScans, newPage, action.payload, state.date),
      };

    /**
     * Set the date.
     */
    case Action.DATE_SET:
      return {
        ...state,
        date: action.payload,
        currentScan: findScan(
          state.scans,
          state.page,
          state.volume,
          action.payload
        ),
      };

    /**
     * Set the current scan to the previous/next one available for the
     * current page & volume (if one exists).
     */
    case Action.DATE_ADD:
    case Action.DATE_SUB:
      if (!state.currentScan) return state;
      const processedScans = state.scans
        .filter(
          (scan) =>
            scan.volume === state.volume && scan.pages.includes(state.page)
        )
        .sort((a, b) => (a.date > b.date ? 1 : -1));
      const nextIndex = Math.min(
        Math.max(
          action.type === Action.DATE_SUB
            ? processedScans.indexOf(state.currentScan) - 1
            : processedScans.indexOf(state.currentScan) + 1,
          0
        ),
        processedScans.length - 1
      );
      const nextScan = processedScans[nextIndex];
      return {
        ...state,
        date: nextScan.date,
        currentScan: nextScan,
      };

    /**
     * Import a set of scans.
     */
    case Action.SCANS_SRC:
      const scansHighest = getHighestPage(
        action.payload.filter((scan) => scan.volume === state.volume)
      );
      page = Math.min(Math.max(state.page, 0), scansHighest);
      return {
        ...state,
        scans: action.payload,
        highestPage: scansHighest,
        page,
        currentScan: findScan(action.payload, page, state.volume, state.date),
      };

    /**
     * Import a JSON manifest.
     */
    case Action.MANIFEST_SRC:
      return { ...state, manifestPath: action.payload };
    default:
      return state;
  }
};

/**
 * Used to find `currentScan` - the scan taken closest to `state.date` of all
 * versions of the current page and volume.
 *
 * @param scans An array containing all scans to be searched.
 * @param page Find scans containing this page number.
 * @param volume Find scans from this volume.
 * @param date Find the scan taken closest to this date.
 * @return ScanProps An array containing the most recent scan of each page,
 */
const findScan = (
  scans: ScanProps[],
  page: number,
  volume: number,
  date: Date
) => {
  const filteredScans = scans.filter(
    (scan) => scan.pages.includes(page) && scan.volume === volume
  );
  if (filteredScans.length < 1) {
    return undefined;
  }
  const newScan = filteredScans.reduce((closest, curr) => {
    return Math.abs(curr.date.getTime() - date.getTime()) <
      Math.abs(closest.date.getTime() - date.getTime()) &&
      curr.pages.includes(page)
      ? curr
      : closest;
  });
  return newScan;
};

/**
 * Get the highest page number present in a given set of scans.
 *
 * @param scans The scans to parse.
 * @return number The highest page number present.
 */
const getHighestPage = (scans: ScanProps[]) => {
  const max = Math.max(...scans.map((scan) => Math.max(...scan.pages)), 0);
  return max;
};

export { AppReducer as default };
