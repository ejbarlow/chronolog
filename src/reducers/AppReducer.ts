import AppState from "../types/AppState";
import { Action, ActionType } from "../types/Actions";
import ScanProps from "../types/ScanProps";

const AppReducer = (state: AppState, action: ActionType): AppState => {
  let page;
  switch (action.type) {
    case Action.PAGE_ADD:
      page =
        state.page + 2 <= state.highestPage
          ? state.page + 2
          : state.highestPage;
      return {
        ...state,
        page,
        currentScan: findScan(state.scans, page, state.volume, state.date),
      };
    case Action.PAGE_SUB:
      page = state.page - 2 > 0 ? state.page - 2 : 0;
      return {
        ...state,
        page,
        currentScan: findScan(state.scans, page, state.volume, state.date),
      };
    case Action.PAGE_SET:
      return action.payload > -1 && action.payload <= state.highestPage
        ? {
            ...state,
            page: action.payload,
            currentScan: findScan(
              state.scans,
              action.payload,
              state.volume,
              state.date
            ),
          }
        : state;
    case Action.VOL_SET:
      const volHighest = getHighestPage(
        state.scans.filter((scan) => scan.volume === action.payload)
      );
      const newPage = state.page < volHighest ? state.page : volHighest;
      return {
        ...state,
        volume: action.payload,
        highestPage: volHighest,
        page: newPage,
        currentScan: findScan(state.scans, newPage, action.payload, state.date),
      };
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
    case Action.SCANS_SRC:
      const scansHighest = getHighestPage(
        action.payload.scans.filter((scan) => scan.volume === state.volume)
      );
      return {
        ...state,
        scans: action.payload.scans,
        highestPage: scansHighest,
        page: state.page < scansHighest ? state.page : scansHighest,
        currentScan: findScan(
          action.payload.scans,
          state.page,
          state.volume,
          state.date
        ),
      };
    case Action.MANIFEST_SRC:
      return { ...state, manifestPath: action.payload };
    default:
      return state;
  }
};

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

const getHighestPage = (scans: ScanProps[]) => {
  const { pages } = scans.sort((a, b) => (a.pages[0] > b.pages[0] ? -1 : 1))[0];
  return pages[pages.length - 1];
};

export { AppReducer as default };
