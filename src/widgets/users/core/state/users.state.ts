import { UsersListState } from './users-list-state';

export class UsersState {
  public readonly usersListState: UsersListState = new UsersListState();

  constructor(
    state?: Partial<UsersState>,
  ) {
    if (state !== undefined) {
      Object.assign(this, state);
    }
  }
}
