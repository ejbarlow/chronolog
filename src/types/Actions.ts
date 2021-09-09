export enum ActionType {
  PAGE_ADD = '_PAGE_ACTION_ADD_',
  PAGE_SUB = '_PAGE_ACTION_SUB_',
  PAGE_SET = '_PAGE_ACTION_SET_',
  DATE_SET = '_DATE_ACTION_SET_',
}

export type StateAction =
  | { type: ActionType.PAGE_ADD }
  | { type: ActionType.PAGE_SUB }
  | { type: ActionType.PAGE_SET, payload: number }
  | { type: ActionType.DATE_SET, payload: Date };
