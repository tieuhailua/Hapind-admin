import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { User } from 'src/app/model/user.model';
import { EventEmitter, Output } from '@angular/core';

import { UserService } from 'src/app/user/user.service';
import { UserMusic } from 'src/app/model/user-music.model';
import { UserSinger } from 'src/app/model/user-singer.model';
import { UserPet } from 'src/app/model/user-pet.model';
import { UserLanguage } from 'src/app/model/user-language.model';
import { UserHobby } from 'src/app/model/user-hobby.model';
import { UserExpecting } from 'src/app/model/user-expecting.model';
import { UserExercise } from 'src/app/model/user-exercise.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';

import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'fury-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ReportDetailsComponent implements OnInit {

  @Input()
  user: User;
  @Output() userUpdated = new EventEmitter<User>();

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  musicList: UserMusic[];
  singerList: UserSinger[];
  petList: UserPet[];
  languageList: UserLanguage[];
  hobbyList: UserHobby[];
  expectingList: UserExpecting[];
  exerciseList: UserExercise[];

  slides = [
    { 'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg' },
    { 'image': 'https://res.cloudinary.com/dxlcsubez/image/upload/f_auto,q_auto/e44w6saipufr4qhbtesw' },
    { 'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg' },
    { 'image': 'https://res.cloudinary.com/dxlcsubez/image/upload/f_auto,q_auto/e44w6saipufr4qhbtesw' },
    { 'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg' }
  ];

  //slides: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ReportDetailsComponent>,
    private fb: UntypedFormBuilder, private userService: UserService,
    private authService: AuthService, private cdr: ChangeDetectorRef, private zone: NgZone) {
  }

  ngOnInit() {
    // if (this.defaults) {
    //   this.mode = 'update';
    // } else {
    //   this.defaults = {} as User;
    // }

    // this.form = this.fb.group({
    //   firstName: [this.defaults.firstName || '',],
    //   lastName: [this.defaults.lastName || ''],
    //   street: this.defaults.street || '',
    //   city: this.defaults.city || '',
    //   zipcode: this.defaults.zipcode || '',
    //   phoneNumber: this.defaults.phoneNumber || '',
    // });

    this.mode = this.defaults ? 'update' : 'create';
    this.slides = this.defaults?.evidences || [];

    this.form = this.fb.group({
      id: [this.defaults?.id],
      reason: [this.defaults?.reason],
      userByReportedId: [this.defaults?.userByReportedId],
      fullname: [this.defaults?.fullname],
      userByReporterId: [this.defaults?.userByReporterId],
      description: [this.defaults?.description],
      createdAt: [this.defaults?.createdAt],
      evidences: [this.defaults?.evidences],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateTable();
      //this.userService.ban(this.defaults.id,this.authService.getSubToken());
    }
  }

  getEvidenceImages() {
    return this.form.get('evidences').value.map(evidence => evidence.image);
  }

  createCustomer() {
    const customer = this.form.value;
    customer.id = this.defaults.id;
    this.cdr.detectChanges();
    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.form.value;
    customer.id = this.defaults.id;
    console.log('banned:');
    this.userService.findById(this.defaults.id).subscribe((user) => {
      this.user = user;
    });
    this.dialogRef.close(customer);
  }

  updateTable() {
    const id = this.defaults?.id;
    // Subscribe to findById to get the User object
    this.userService.findById(id).subscribe(
      (user: User) => {
        // Now that you have the User object, you can pass it to the ban method
        this.userService.ban(id, user).subscribe(
          (updatedUser) => {
            this.userUpdated.emit(updatedUser); // Emit the updated user
            this.dialogRef.close(this.user);
          },
          (error) => {
            // Handle validation errors and update form controls
            if (error instanceof HttpErrorResponse && error.status === 400) {
              this.handleValidationErrors(error.error);
            }
          }
        );
      },
      (error) => {
        // Handle errors from the findById method
        console.error('Error fetching user by ID:', error);
      }
    );
  }



  private handleValidationErrors(errors: { [key: string]: string }): void {
    console.log('Validation errors:', errors);
    Object.keys(errors).forEach((field) => {
      const control = this.form.get(field);
      if (control) {
        control.setErrors({ serverError: errors[field] });
        console.log(`Updated form control '${field}' with error:`, control);
      }
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  currentIndex = 0;


  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  changeSlide(step: number) {
    this.currentIndex = (this.currentIndex + step + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

}
