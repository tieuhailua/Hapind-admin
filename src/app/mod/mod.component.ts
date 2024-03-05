import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faFacebook, faGithub, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { LoginService } from '../pages/authentication/login/login.service';
import { ModService } from './mod.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'fury-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ModComponent implements OnInit {
  form = this.fb.group({
    username: [null, Validators.required],
  });

  constructor(private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private modService: ModService
  ) {
  }
  
  ngOnInit() {
  }

  send(): void {
    const username = this.form.get('username').value;
    console.log(username);
    if (username == null) {
      this.snackbar.open('Username can not be null', 'OK', {
        duration: 5000
      });
      return;
    }

    this.modService.createMod(username).subscribe(
      response => {
        this.router.navigate(['', 'dashboard']);
        this.snackbar.open('Your username is '+username+ ' Password is: Aa@123456', 'OK', { duration: 5000 });
        console.log(response);
      },
      error => {
        // Handle authentication error here
        console.error('Authentication error:', error);
        // Display a snackbar or error message to the user
        this.snackbar.open('Your username is exits', 'OK', { duration: 5000 });
      }
    );
    //this.router.navigate(['/']);
  }
}
