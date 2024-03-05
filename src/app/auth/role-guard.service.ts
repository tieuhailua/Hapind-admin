// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router, private snackbar: MatSnackBar) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = jwtDecode(token);
        console.log(tokenPayload.aud);
        if (
            !this.auth.isAuthenticated() ||
            tokenPayload.aud !== expectedRole
        ) {
            //this.router.navigate(['login']);
            // Handle authentication error here
        // Display a snackbar or error message to the user
        this.snackbar.open('You do not have permit to access this', 'OK', {
          duration: 5000
        });
            return false;
        }
        return true;
    }
}
