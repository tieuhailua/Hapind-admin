import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private authUrl = 'http://localhost:2203/api/auth/changePassword';
  constructor(private http: HttpClient) { }

  changePassword(username: string, password: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('newPassword', newPassword);

    return this.http.put<any>(this.authUrl, { username, password }, { params });
  }
}
