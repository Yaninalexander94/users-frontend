import { Action } from '@ngrx/store';
import { IUserItem } from '../interfaces';
import { UsersListState, UsersState } from '../state';
import { UsersActionsTypes } from './users-actions-types';

export class LoadUsersListSuccess implements Action {
  readonly type = UsersActionsTypes.LOAD_USERS_LIST_SUCCESS;

  constructor(
    public value: IUserItem[],
  ) {
  }

  public payload(state: UsersState): Partial<UsersState> {
    return new UsersState({
      ...state,
      usersListState: new UsersListState({
        ...state.usersListState,
        loading: false,
        value: this.value,
      }),
    });
  }
}
