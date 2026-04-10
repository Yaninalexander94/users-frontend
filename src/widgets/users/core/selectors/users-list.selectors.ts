import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UsersState, UsersListState } from '../state';
import { USERS_STATE_FEATURE_SELECTOR } from './users.selectors';

export const USERS_LIST_SELECTOR: MemoizedSelector<UsersState, UsersListState> = createSelector(
  USERS_STATE_FEATURE_SELECTOR,
  (state: UsersState) => state.usersListState,
);
