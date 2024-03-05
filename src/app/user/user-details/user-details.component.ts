import { Component, Inject,Input, OnInit } from '@angular/core';
import { UntypedFormBuilder,FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { User } from 'src/app/model/user.model';
import { EventEmitter, Output } from '@angular/core';

import { UserService } from '../user.service';
import { UserMusic } from 'src/app/model/user-music.model';
import { UserSinger } from 'src/app/model/user-singer.model';
import { UserPet } from 'src/app/model/user-pet.model';
import { UserLanguage } from 'src/app/model/user-language.model';
import { UserHobby } from 'src/app/model/user-hobby.model';
import { UserExpecting } from 'src/app/model/user-expecting.model';
import { UserExercise } from 'src/app/model/user-exercise.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangeDetectorRef,NgZone  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'fury-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

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

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    private fb: UntypedFormBuilder, private userService: UserService,
    private authService: AuthService,private cdr: ChangeDetectorRef,private zone: NgZone) {
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

    this.form = this.fb.group({
      id: [this.defaults?.id],
      fullname: [this.defaults?.fullname],
      email: [this.defaults?.email],
      phone: [this.defaults?.phone],
      dob: [this.defaults?.dob],
      gender: [this.defaults?.gender],
      address: [this.defaults?.address],
      family: [this.defaults?.family],
      drinking: [this.defaults?.drinking],
      work: [this.defaults?.work],
      smoking: [this.defaults?.smoking],
      purpose: [this.defaults?.purpose],
      literacy: [this.defaults?.literacy],
      habit: [this.defaults?.habit],
      status: [this.defaults?.status],
      height: [this.defaults?.height],
      description: [this.defaults?.description],
      school: [this.defaults?.school],
      password: [this.defaults?.password],
      lastLogin: [this.defaults?.lastLogin],
      createTime: [this.defaults?.createTime],
      weight: [this.defaults?.weight],
      zodiac: [this.defaults?.zodiac],
      finding: [this.defaults?.finding],
      musicList: [],
      singerList: [],
      petList: [],
      languageList: [],
      hobbyList: [],
      expectingList: [],
      exerciseList: [],
    });

    //music
    this.userService.findMusicById(this.defaults?.id).subscribe((musicList) => {
      // Assuming musicList is an array property in the User object
      this.musicList = musicList
    });

    
    //singer
    this.userService.findSingerById(this.defaults?.id).subscribe((singerList) => {
      // Assuming musicList is an array property in the User object
      this.singerList = singerList
    });

    //pet
    this.userService.findPetById(this.defaults?.id).subscribe((petList) => {
      // Assuming musicList is an array property in the User object
      this.petList = petList
    });

    //Language
    this.userService.findLanguageById(this.defaults?.id).subscribe((languageList) => {
      // Assuming musicList is an array property in the User object
      this.languageList = languageList
    });

    //Hobby
    this.userService.findHobbyById(this.defaults?.id).subscribe((hobbyList) => {
      // Assuming musicList is an array property in the User object
      this.hobbyList = hobbyList
    });

    //Expecting
    this.userService.findExerciseById(this.defaults?.id).subscribe((exerciseList) => {
      // Assuming musicList is an array property in the User object
      this.exerciseList = exerciseList
    });

    //Exercise
    this.userService.findExpectingById(this.defaults?.id).subscribe((expectingList) => {
      // Assuming musicList is an array property in the User object
      this.expectingList = expectingList
    });

    console.log('OnOpenWeb:', this.form.value);

  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateTable();
      //this.userService.ban(this.defaults.id,this.authService.getSubToken());
    }
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
  

  // updateTable() {
  //   const id = this.defaults?.id;
  //   const user = this.userService.findById(id);
  //   this.userService.ban(id,user).subscribe(
  //     (updatedUser) => {
  //       this.userUpdated.emit(updatedUser); // Emit the updated user
  //       this.dialogRef.close(this.user);
  //     },
  //     (error) => {
  //       // Handle validation errors and update form controls
  //       if (error instanceof HttpErrorResponse && error.status === 400) {
  //         this.handleValidationErrors(error.error);
  //       }
  //     }
  //   );
  // }

  // updateTable() {
  //   console.log('updateTable called');
  //   const user = this.form.value;
  //   this.userService.upsert(user.id, user).pipe(
  //     switchMap(() => this.userService.findAll())  // Add this line for re-subscription
  //   ).subscribe((users) => {
  //     console.log('findAll completed after update');
  //     // Handle the updated list of users
  //     this.cdr.detectChanges();
  //     this.dialogRef.close(user);
  //   },
  //   (error) => {
  //     console.error('Error:', error);
  //     // Handle error
  //   });
  // }
  
  
  
  // updateTable() {
  //   const user = this.form.value;
  //   this.userService.upsert(user.id, user).subscribe(() => {
  //     this.user = user;
  //     this.cdr.detectChanges();
  //     this.dialogRef.close(user);
  //   },
  //   (error) => {
  //     // Handle validation errors and update form controls
  //     if (error instanceof HttpErrorResponse && error.status === 400) {
  //       this.handleValidationErrors(error.error);
  //     }
  //   }
  // );
  // }

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

}
