import AppState from "../types/AppState";
import { Action, ActionType } from "../types/Actions";
import ScanProps from "../types/ScanProps";
import path from "path";

const AppReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case Action.PAGE_ADD:
      return { ...state, page: state.page + 1 };
    case Action.PAGE_SUB:
      return { ...state, page: state.page - 1 };
    case Action.PAGE_SET:
      return { ...state, page: action.payload };
    case Action.DATE_SET:
      return { ...state, date: action.payload };
    case Action.SCANS_SRC:
      const scans: ScanProps[] = [];
      // todo - de-node-ify
      const scanRoot = path.dirname(action.payload);
      fetch(action.payload)
        .then((r) => r.json())
        .then((data) => {
          for (const date in data) {
            for (const scan in data[date]) {
              const fileStr = data[date][scan];
              const dirStr = `${scanRoot}/${date}/`;
              const [y, m, d] = date
                .split("_")
                .map((num: string) => parseInt(num));
              const dateProp = new Date(y, m - 1, d);
              const [, pagesStr] = fileStr.split("_");
              const pages = pagesStr
                .split("-")
                .map((num: string) => parseInt(num));
              scans.push({
                uid: "000000",
                path: `${dirStr}/${fileStr}`,
                pages,
                date: dateProp,
                version: 0,
              });
            }
          }
        });
      // console.log(JSON.stringify(data)));
      return { ...state, scans };
    default:
      return state; // TODO
  }
};

export { AppReducer as default };
