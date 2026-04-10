import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { IUserItem, UsersFacade } from '../../core';
import { UsersRepository } from '../../data';


/**
 * Компонент формы добавления пользователя
 */
@Component({
  selector: 'app-user-item',
  imports: [
    TranslateModule,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    NgTemplateOutlet,

  ],
  providers: [
    UsersRepository,
    UsersFacade,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true,
})
export class UserForm {
  public user: Omit<IUserItem, 'id' | 'isBlocked'> = {
    login: '',
    email: '',
    name: '',
    surname: '',
    position: '',
  };

  constructor(
    private dialogRef: MatDialogRef<UserForm>,
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
   * Добавление пользователя
   */
  public onAddUser(): void {
    this.usersFacade.addUserItem(this.user);
    this.dialogRef.close();
  }
}
