import { UsersActions, UsersActionsTypes as actions } from '../actions';
import { UsersState } from '../state';

export const USERS_REDUCER = (
  state: UsersState = new UsersState(),
  action: UsersActions,
): Partial<UsersState> => {
  switch (action.type) {
    case actions.LOAD_USERS_LIST:
      return action.payload(state);
    case actions.LOAD_USERS_LIST_SUCCESS:
      return action.payload(state);
    case actions.LOAD_USERS_LIST_FAILURE:
      return action.payload(state);
    default:
      return new UsersState(state);
  }
};
