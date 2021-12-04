import AppState from "../types/AppState";
import { Action, ActionType } from "../types/Actions";
import ScanProps from "../types/ScanProps";

const AppReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case Action.PAGE_ADD:
      return {
        ...state,
        page:
          state.page + 2 <= state.highestPage
            ? state.page + 2
            : state.highestPage,
      };
    case Action.PAGE_SUB:
      return {
        ...state,
        page: state.page - 2 >= 0 ? state.page - 2 : 0,
      };
    case Action.PAGE_SET:
      return action.payload > 0 && action.payload < state.highestPage
        ? { ...state, page: action.payload }
        : state;
    case Action.VOL_SET:
      const volHighest = getHighestPage(
        state.scans.filter((scan) => scan.volume === action.payload)
      );
      return {
        ...state,
        volume: action.payload,
        highestPage: volHighest,
        page: state.page < volHighest ? state.page : volHighest,
      };
    case Action.DATE_SET:
      return { ...state, date: action.payload };
    case Action.SCANS_SRC:
      const scansHighest = getHighestPage(
        action.payload.scans.filter((scan) => scan.volume === state.volume)
      );
      return {
        ...state,
        scans: action.payload.scans,
        highestPage: scansHighest,
        page: state.page < scansHighest ? state.page : scansHighest,
      };
    case Action.MANIFEST_SRC:
      return { ...state, manifestPath: action.payload };
    default:
      return state; // TODO
  }
};

const getHighestPage = (scans: ScanProps[]) => {
  const { pages } = scans.sort((a, b) => (a.pages[0] > b.pages[0] ? -1 : 1))[0];
  return pages[pages.length - 1];
};

export { AppReducer as default };
