import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken():String{
    return localStorage.getItem('token');
  }

  public getSubToken():number{
    const token = localStorage.getItem('token');
    const tokenPayload = jwtDecode(token);
    return Number.parseInt(tokenPayload.sub);
  }
}
