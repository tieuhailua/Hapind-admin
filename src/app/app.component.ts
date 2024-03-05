import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';
import { AuthService } from './auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService) {
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    let memuItems: any[] = [];
    [
      {
        name: 'Happind',
        position: 0,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'User',
        routeOrFunction: '/user',
        icon: 'person_pin',
        position: 5,
        pathMatchExact: true,
      },
    ];

    const token = localStorage.getItem('token');
    if (token != null) {
      const tokenPayload = jwtDecode(token);
      if (tokenPayload.aud == 'admin') {
        memuItems.push(
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
        );
      }
      if (tokenPayload.aud == 'mod') {
        memuItems.push(
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
        );
      }
    }

    this.sidenavService.addItems(memuItems);
  }
}
