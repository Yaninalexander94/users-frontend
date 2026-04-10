import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { UsersListState, UsersState } from '../state';
import { UsersActionsTypes } from './users-actions-types';

export class LoadUsersListFailure implements Action {
  readonly type = UsersActionsTypes.LOAD_USERS_LIST_FAILURE;

  constructor(
    public error: HttpErrorResponse,
  ) {
  }

  public payload(state: UsersState): Partial<UsersState> {
    return new UsersState({
      ...state,
      usersListState: new UsersListState({
        ...state.usersListState,
        loading: false,
        error: this.error,
      }),
    });
  }
}
