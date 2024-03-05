import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export abstract class BaseService<T> {
  config = 'http://localhost:2203/api';
  constructor(private httpClient: HttpClient, public modelName: string) {
  }


  abstract mapModel(model: any): T;

  findAll(populate: string[] | null = null): Observable<T[]> {
    let url = `${this.config}/${this.modelName}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapListToModelList(res);
        }
      })
    );
  }

  findById(id: number, populate: string[] | null = null): Observable<T> {
    let url = `${this.config}/${this.modelName}/${id}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  upsert(id: number,model: T): Observable<T> {
    const url = `${this.config}/${this.modelName}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.httpClient.put(url, JSON.stringify(model), { headers }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  create(model: T): Observable<T> {
    const url = `${this.config}/${this.modelName}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.httpClient.post(url, JSON.stringify(model), { headers }).pipe(
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
    return this.httpClient.delete(url).pipe(
      map((res: any) => {
        if (res && res.error) {
          throw new Error(res.error);
        }
      })
    );
  }

  private mapListToModelList(list: Array<Object>): T[] {
    return list.map((item) => this.mapModel(item));
  }
}
