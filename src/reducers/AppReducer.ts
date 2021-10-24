import AppState from "../types/AppState";
import { Action, ActionType } from "../types/Actions";

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
    case Action.DATE_SET:
      return { ...state, date: action.payload };
    case Action.SCANS_SRC:
      return { ...state, ...action.payload };
    case Action.MANIFEST_SRC:
      return { ...state, manifestPath: action.payload };
    default:
      return state; // TODO
  }
};

export { AppReducer as default };
