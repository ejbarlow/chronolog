import { Action, ActionType } from "../types/Actions";

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

export const SCANS_SRC = (path: string): ActionType => ({
  type: Action.SCANS_SRC,
  payload: path,
});
