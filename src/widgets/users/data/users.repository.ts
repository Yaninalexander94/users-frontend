import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_BASE_URL } from '../../../shared';
import { IUserItem } from '../core';

/**
 * Репозиторий для работы со списком пользователей
 */
@Injectable()
export class UsersRepository {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  /**
   * Загрузить список пользователей
   */
  public getUsersList(): Observable<IUserItem[]> {
    return this.http.get<IUserItem[]>(`${ BACKEND_BASE_URL }/users`);
  }

  /**
   * Обновление статуса пользователя
   */
  public changeStatusUserItem(item: IUserItem): Observable<IUserItem> {
    return this.http.put<IUserItem>(`${ BACKEND_BASE_URL }/users/${ item.id }`, item);
  }

  /**
   * Удаление пользователя
   */
  public deleteUserItem(id: number): Observable<IUserItem> {
    return this.http.delete<IUserItem>(`${ BACKEND_BASE_URL }/users/${ id }`);
  }

  /**
   * Добавление пользователя
   */
  public addUserItem(item: Partial<IUserItem>): Observable<IUserItem[]> {
    return this.http.post<IUserItem[]>(`${ BACKEND_BASE_URL }/users`, item);
  }
}
