import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Admin } from '../model/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  form: FormGroup;
  config = 'http://localhost:2203/api';
  modelName: string;
  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  mapModel(model: any): Admin {
    return new Admin(model);
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  isNameUniqueValidator(existingNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;

      if (existingNames.includes(name)) {
        return { nameTaken: true };
      }

      return null;
    };
  }

  findAll(populate: string[] | null = null): Observable<Admin[]> {
    let url = `${this.config}/${this.modelName}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapListToModelList(res);
        }
      })
    );
  }

  findById(id: number, populate: string[] | null = null): Observable<Admin> {
    let url = `${this.config}/${this.modelName}/${id}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  upsert(id: number, model: Admin): Observable<Admin> {
    const url = `${this.config}/${this.modelName}/${id}`;
    return this.httpClient.put(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  create(model: Admin): Observable<Admin> {
    const url = `${this.config}/${this.modelName}`;
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
  
  deleteById(id: number): Observable<void> {
    const url = `${this.config}/${this.modelName}/${id}`;
    return this.httpClient.delete(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res && res.error) {
          throw new Error(res.error);
        }
      })
    );
  }

  private mapListToModelList(list: Array<Object>): Admin[] {
    return list.map((item) => this.mapModel(item));
  }
}
