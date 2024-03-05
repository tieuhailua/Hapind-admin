import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { LoginService } from './login.service';
import { SidenavService } from 'src/app/layout/sidenav/sidenav.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private loginService: LoginService,
    private sidenavService: SidenavService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // send() {
  //   this.router.navigate(['/']);
  //   this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'THANKS', {
  //     duration: 10000
  //   });
  // }

  send(): void {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;

    this.loginService.authenticateUser(username, password).subscribe(
      response => {
        //if (token != null) {
          const token = localStorage.getItem('token');
          const tokenPayload = jwtDecode(token); 
          let memuItems: any []  =this.loginService.initIndex(tokenPayload.aud);
          console.log(memuItems);
          //this.cd.detectChanges();
          this.sidenavService.addItems(memuItems);
          console.log(memuItems);
          this.router.navigate(['', 'dashboard']);
        //}
        // Handle successful authentication here
        console.log('Authentication successful:', response);
        // Navigate to the desired route on success
      },
      error => {
        // Handle authentication error here
        console.error('Authentication error:', error);
        // Display a snackbar or error message to the user
        this.snackbar.open('Authentication failed. Please check your credentials.', 'OK', {
          duration: 5000
        });
      }
    );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
