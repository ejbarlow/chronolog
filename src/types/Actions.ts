import ScanProps from "./ScanProps";

export enum Action {
  PAGE_ADD = "_PAGE_ACTION_ADD_",
  PAGE_SUB = "_PAGE_ACTION_SUB_",
  PAGE_SET = "_PAGE_ACTION_SET_",
  VOL_SET = "_VOL_ACTION_SET_",
  DATE_SET = "_DATE_ACTION_SET_",
  SCANS_SRC = "_SCANS_ACTION_SRC_",
  MANIFEST_SRC = "_MANIFEST_ACTION_SRC",
}

export type ActionType =
  | { type: Action.PAGE_ADD }
  | { type: Action.PAGE_SUB }
  | { type: Action.PAGE_SET; payload: number }
  | { type: Action.VOL_SET; payload: number }
  | { type: Action.DATE_SET; payload: Date }
  | {
      type: Action.SCANS_SRC;
      payload: { scans: ScanProps[]; highestPage: number };
    }
  | { type: Action.MANIFEST_SRC; payload: string };
