import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ResetPasswordService } from './reset-password.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'fury-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ResetPasswordComponent implements OnInit {
  visible = false;
  oldPasswordVisible = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  newInputType = 'password';
  oldInputType = 'password';
  confirmInputType = 'password';

  form = this.fb.group({
    oldPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
    confirmPassword: [null, Validators.required]
  });

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private resetPasswordService: ResetPasswordService
  ) { }

  ngOnInit() {
  }

  send() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const oldPassword = this.form.get('oldPassword').value;
    const newPassword = this.form.get('newPassword').value;
    const confirmPassword = this.form.get('confirmPassword').value;
    const token = localStorage.getItem('token');
    const tokenPayload = jwtDecode(token);
    const username = tokenPayload.sub;
    console.log(oldPassword, confirmPassword, username);
    if (oldPassword == null || newPassword == null || confirmPassword == null) {
      this.snackbar.open('Password can not be null', 'OK', {
        duration: 5000
      });
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      this.snackbar.open('Password must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.', 'OK', {
        duration: 5000
      });
      return;
    }
    if (confirmPassword != newPassword) {
      this.snackbar.open('Confirm Password must same as New Password', 'OK', {
        duration: 5000
      });
      return;
    }
    this.resetPasswordService.changePassword(username, oldPassword, confirmPassword).subscribe(
      response => {
        this.router.navigate(['', 'dashboard']);
        this.snackbar.open('Change password successfully', 'OK', { duration: 5000 });
        console.log(response);
      },
      error => {
        // Handle authentication error here
        console.error('Authentication error:', error);
        // Display a snackbar or error message to the user
        this.snackbar.open('Your old password is invalid', 'OK', { duration: 5000 });
      }
    );
    //this.router.navigate(['/']);
  }

  toggleOldVisibility() {
    if (this.oldPasswordVisible) {
      this.oldInputType = 'password';
      this.oldPasswordVisible = false;
      this.cd.markForCheck();
    } else {
      this.oldInputType = 'text';
      this.oldPasswordVisible = true;
      this.cd.markForCheck();
    }
  }
  toggleConfirmVisibility() {
    if (this.confirmPasswordVisible) {
      this.confirmInputType = 'password';
      this.confirmPasswordVisible = false;
      this.cd.markForCheck();
    } else {
      this.confirmInputType = 'text';
      this.confirmPasswordVisible = true;
      this.cd.markForCheck();
    }
  }
  toggleNewVisibility() {
    if (this.newPasswordVisible) {
      this.newInputType = 'password';
      this.newPasswordVisible = false;
      this.cd.markForCheck();
    } else {
      this.newInputType = 'text';
      this.newPasswordVisible = true;
      this.cd.markForCheck();
    }
  }
}
