import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { USERS_REDUCER_NODE } from '../constants';
import { UsersState } from '../state';

export const USERS_STATE_FEATURE_SELECTOR: MemoizedSelector<object, UsersState> = createFeatureSelector<UsersState>(USERS_REDUCER_NODE);
