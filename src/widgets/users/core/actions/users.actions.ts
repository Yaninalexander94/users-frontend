import { LoadUsersListFailure } from './load-users-list-failure.action';
import { LoadUsersListSuccess } from './load-users-list-success.action';
import { LoadUsersList } from './load-users-list.action';

export type UsersActions = LoadUsersList | LoadUsersListSuccess | LoadUsersListFailure;
