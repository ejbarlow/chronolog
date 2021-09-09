import AppState from '../types/AppState';
import { ActionType, StateAction } from '../types/Actions';

const AppReducer = (state: AppState, action: StateAction): AppState => {
  switch (action.type) {
    case ActionType.PAGE_ADD:
      return { ...state, page: state.page + 1 };
    case ActionType.PAGE_SUB:
      return { ...state, page: state.page - 1 };
    case ActionType.PAGE_SET:
      return { ...state, page: action.payload };
    default:
      return state; // TODO
  }
};

export { AppReducer as default };
