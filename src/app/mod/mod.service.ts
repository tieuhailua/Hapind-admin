import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModService {
  private authUrl = 'http://localhost:2203/api/auth/createMod/';
  constructor(private http: HttpClient) { }

  createMod(username: string): Observable<any> {
    return this.http.post<any>(this.authUrl+username, { username });
  }

}
