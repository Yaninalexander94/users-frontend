import { Action } from '@ngrx/store';
import { UsersListState, UsersState } from '../state';
import { UsersActionsTypes } from './users-actions-types';

export class LoadUsersList implements Action {
  readonly type = UsersActionsTypes.LOAD_USERS_LIST;

  public payload(state: UsersState): Partial<UsersState> {
    return new UsersState({
      ...state,
      usersListState: new UsersListState({
        ...state.usersListState,
        loading: true,
      }),
    });
  }
}
