import { HttpErrorResponse } from '@angular/common/http';
import { assignStrict } from '../../../../../shared';
import { IUserItem } from '../../interfaces';

export class UsersListState {
  public readonly error: HttpErrorResponse | null = null;
  public readonly loading: boolean = false;
  public readonly value: IUserItem[] = [];

  constructor(state?: Partial<UsersListState>) {
    assignStrict(this, state);
  }
}
