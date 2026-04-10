import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { IUserItem, UsersFacade } from '../../core';
import { UsersRepository } from '../../data';
import { UserForm } from '../user-form';
import { UserItem } from '../user-item';

/**
 * Компонент списка пользователей
 */
@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    TranslateModule,
    MatButton,
  ],
  providers: [
    UsersRepository,
    UsersFacade,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
})
export class UsersList implements OnInit {
  public displayedColumns: string[] = ['login', 'email', 'name', 'surname', 'position', 'isBlocked'];

  public isLoading$: Signal<boolean> = computed((): boolean => this.usersFacade.stateSignal$().usersListState.loading);
  public usersList$: Signal<IUserItem[]> = computed((): IUserItem[] => this.usersFacade.stateSignal$().usersListState.value);

  public highlightedRow$: WritableSignal<IUserItem | null> = signal<IUserItem | null>(null);

  constructor(
    private usersFacade: UsersFacade,
    private dialog: MatDialog,
  ) {
  }

  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {
    this.usersFacade.loadUsersList();
  }

  /**
   * Добавление нового пользователя
   */
  public onAddUser(): void {
    this.dialog.open(UserForm, {
      width: '400px',
    });
  }

  /**
   * Открыть карточку пользователя
   */
  public openUserCard(row: IUserItem): void {
    this.dialog.open(UserItem, {
      width: '400px',
      data: {user: row},
    });
  }
}
