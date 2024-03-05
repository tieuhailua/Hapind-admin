import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/model/blog';

@Injectable({
  providedIn: 'root'
})
export class EditorService  {
  form: FormGroup;
  config = 'http://localhost:2203/api';
  modelName= 'blog';
  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  mapModel(model: any): Blog {
    return new Blog(model);
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  create(model: Blog,username:string): Observable<Blog> {
    const url = `${this.config}/${this.modelName}/${username}`;
    return this.httpClient.post(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  private mapListToModelList(list: Array<Object>): Blog[] {
    return list.map((item) => this.mapModel(item));
  }
}
