import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/user-detail';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:6001/api/user';
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<UserDetail[]> {
    return this.httpClient.get<UserDetail[]>(`${this.baseUrl}/list`);
  }

  createUser(userDetail: UserDetail): Observable<UserDetail> {
    return this.httpClient.post<UserDetail>(
      `${this.baseUrl}/create`,
      userDetail
    );
  }
}
