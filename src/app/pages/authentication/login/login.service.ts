import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authUrl = 'http://localhost:2203/api/auth/signin';

  constructor(private http: HttpClient) { }

  //   authenticateUser(username: string, password: string): Observable<any> {
  //     const loginRequest = {
  //       username: username,
  //       password: password
  //     };

  //     return this.http.post(this.authUrl, loginRequest);
  // }

  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(response => {
        console.log('Authentication successful. Received token:', response.accessToken);
        localStorage.setItem('token', response.accessToken);
      })
    );
  }

  initIndex(role: any): any[] {
    const roleString = String(role);
    if (roleString == 'admin') {
      return [
        {
          name: 'APP',
          position: 0,
          type: 'subheading',
          customClass: 'first-subheading'
        },
        {
          name: 'Dashboard',
          routeOrFunction: '/',
          icon: 'dashboard',
          position: 5,
          pathMatchExact: true
        },
        {
          name: 'Management',
          position: 10,
          type: 'subheading',
          customClass: 'first-subheading'
        },
        {
          name: 'User',
          routeOrFunction: '/user',
          icon: 'person_pin',
          position: 10,
          pathMatchExact: true,
        }, 
        {
          name: 'Choice Menu',
          icon: 'menu',
          position: 10,
          subItems: [
            {
              name: 'Family',
              routeOrFunction: '/family',
              icon: 'people',
              position: 10
            },
            {
              name: 'Drinking',
              routeOrFunction: '/drinking',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Music',
              routeOrFunction: '/music',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Work',
              routeOrFunction: '/work',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Status',
              routeOrFunction: '/status',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Smoking',
              routeOrFunction: '/smoking',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Purpose',
              routeOrFunction: '/purpose',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Literacy',
              routeOrFunction: '/literacy',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Habit',
              routeOrFunction: '/habit',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Reason',
              routeOrFunction: '/reason',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Exercise',
              routeOrFunction: '/exercise',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Expecting',
              routeOrFunction: '/expecting',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Hobby',
              routeOrFunction: '/hobby',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Pet',
              routeOrFunction: '/pet',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Singer',
              routeOrFunction: '/singer',
              icon: 'local_drink',
              position: 10
            },
            {
              name: 'Music',
              routeOrFunction: '/music',
              icon: 'local_drink',
              position: 10
            },
          ]
        },
        {
          name: 'Banned',
          position: 15,
          type: 'subheading',
          customClass: 'first-subheading'
        },
        {
          name: 'Censorship',
          routeOrFunction: '/censorship',
          icon: 'assistant_photo',
          position: 20,
          pathMatchExact: true,
        },
        {
          name: 'Report',
          routeOrFunction: '/report',
          icon: 'assignment_late',
          position: 20,
          pathMatchExact: true
        },
        {
          name: 'Blog',
          position: 25,
          type: 'subheading',
          customClass: 'first-subheading'
        },
        {
          name: 'Blog',
          routeOrFunction: '/editor',
          icon: 'format_shapes',
          position: 25
        },
      ]
    }

    if (roleString == 'mod') {
      return [
        {
        name: 'Happind',
        position: 0,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Censorship',
        routeOrFunction: '/censorship',
        icon: 'assistant_photo',
        position: 5,
        pathMatchExact: true,
      },
      {
        name: 'WYSIWYG Editor',
        routeOrFunction: '/editor',
        icon: 'format_shapes',
        position: 10
      },
      ]
    }
  }
}
