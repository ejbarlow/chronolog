import { Action, ActionType } from "../types/Actions";
import ScanProps from "../types/ScanProps";

export const PAGE_ADD = (): ActionType => ({
  type: Action.PAGE_ADD,
});

export const PAGE_SUB = (): ActionType => ({
  type: Action.PAGE_SUB,
});

export const DATE_SET = (date: Date): ActionType => ({
  type: Action.DATE_SET,
  payload: date,
});

export const PAGE_SET = (pageNum: number): ActionType => ({
  type: Action.PAGE_SET,
  payload: pageNum,
});

export const SCANS_SRC = ({
  scans,
  highestPage,
}: {
  scans: ScanProps[];
  highestPage: number;
}): ActionType => {
  return {
    type: Action.SCANS_SRC,
    payload: {
      scans,
      highestPage,
    },
  };
};

export const MANIFEST_SRC = (manifestPath: string): ActionType => ({
  type: Action.MANIFEST_SRC,
  payload: manifestPath,
});
