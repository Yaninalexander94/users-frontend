import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersRepository } from '../data';
import * as actions from './actions';
import { IUserItem } from './interfaces';
import { USERS_STATE_FEATURE_SELECTOR } from './selectors';
import { UsersState } from './state';

@Injectable()
export class UsersFacade {
  private state$: Observable<UsersState> = this.store$.pipe(select(USERS_STATE_FEATURE_SELECTOR));
  public stateSignal$: Signal<UsersState> = toSignal(this.state$, {initialValue: new UsersState()});

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private store$: Store<UsersState>,
    private repository: UsersRepository,
  ) {
  }

  /**
   * Загрузка списка пользователей
   */
  public loadUsersList(): void {
    this.store$.dispatch(new actions.LoadUsersList());

    this.repository.getUsersList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (value: IUserItem[]) => {
          this.store$.dispatch(new actions.LoadUsersListSuccess(value));
        },
        error: (er: HttpErrorResponse) => {
          this.store$.dispatch(new actions.LoadUsersListFailure(er));
        },
      });
  }

  /**
   * Обновление статуса пользователя
   */
  public changeStatusUserItem(item: IUserItem): void {
    this.repository.changeStatusUserItem({...item, isBlocked: !item.isBlocked})
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.loadUsersList();
        },
        error: (er: HttpErrorResponse) => {
          this.store$.dispatch(new actions.LoadUsersListFailure(er));
        },
      });
  }

  /**
   * Удаление пользователя
   */
  public deleteUserItem(id: number): void {
    this.repository.deleteUserItem(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.loadUsersList();
        },
        error: (er: HttpErrorResponse) => {
          this.store$.dispatch(new actions.LoadUsersListFailure(er));
        },
      });
  }

  /**
   * Добавление пользователя
   */
  public addUserItem(item: Partial<IUserItem>): void {
    this.repository.addUserItem(item)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.loadUsersList();
        },
        error: (er: HttpErrorResponse) => {
          this.store$.dispatch(new actions.LoadUsersListFailure(er));
        },
      });
  }
}
