import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { IUserItem, UsersFacade } from '../../core';
import { UsersRepository } from '../../data';

/**
 * Компонент карточки пользователя
 */
@Component({
  selector: 'app-user-item',
  imports: [
    MatDialogContent,
    TranslateModule,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
  ],
  providers: [
    UsersRepository,
    UsersFacade,
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  standalone: true,
})
export class UserItem {
  public get statusTranslate(): string {
    return this.data.user.isBlocked ? 'widgets.usersList.userItem.status.blocked' : 'widgets.usersList.userItem.status.unblocked';
  }

  public get user(): IUserItem {
    return this.data.user;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: IUserItem },
    private dialogRef: MatDialogRef<UserItem>,
    private usersFacade: UsersFacade,
  ) {
  }

  /**
   * Закрытие карточки
   */
  public onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Удаление пользователя
   */
  public onDeleteUser(): void {
    this.usersFacade.deleteUserItem(this.user.id);
    this.dialogRef.close();
  }

  /**
   * Обновление статуса пользователя
   */
  public onStatusChange(): void {
    this.usersFacade.changeStatusUserItem(this.user);
    this.dialogRef.close();
  }
}
