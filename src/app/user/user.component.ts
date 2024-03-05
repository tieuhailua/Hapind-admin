import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';

import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { ChangeDetectorRef,NgZone  } from '@angular/core';
import { User } from '../model/user.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

@Component({
  selector: 'fury-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {

  modelName = 'user';

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[];

  config = 'http://localhost:2203/api';
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Id', property: 'id', visible: true, isModelProperty: true, sortable: true },
    { name: 'Full Name', property: 'fullname', visible: true, isModelProperty: true },
    { name: 'Email', property: 'email', visible: true, isModelProperty: true },
    { name: 'Phone', property: 'phone', visible: true, isModelProperty: true },
    { name: 'DOB', property: 'dob', visible: true, isModelProperty: true },
    { name: 'Gender', property: 'gender', visible: true, isModelProperty: true },
    { name: 'Address', property: 'address', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<User> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private dialog: MatDialog, private userService: UserService, private router: Router, private httpClient: HttpClient,private cdr: ChangeDetectorRef,private zone: NgZone) {
    console.log('modelName:', this.modelName);
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }



  ngOnInit() {
    this.userService.modelName = this.modelName;
    console.log('userId is:', this.modelName);
    this.loadUsers();
  }

  private loadUsers() {
    this.dataSource = new MatTableDataSource<User>();
    this.userService.findAll().subscribe((users) => {
      this.users = users;
      this.dataSource.data = users;
      
      console.log('OnOpenWeb:', this.users);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.sort.active = 'id';
      this.sort.direction = 'asc';
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/same-route']);
  }

  createNotification() {
    this.dialog.open(SendNotificationComponent).afterClosed().subscribe((notification: Notification) => {
      if (notification) {
        this.userService.createNotification(notification).subscribe((createNotification) => {
          //this.users.unshift(createNotification);
          //this.dataSource.data = this.users;
        });
      }
    });
  }


  // updateUser(user) {
  //   this.userService.findById(user.id).subscribe((currentUser: User) => {
  //     const dialogRef = this.dialog.open(UserDetailsComponent, { data: currentUser });

  //     dialogRef.afterClosed().subscribe((updatedUser: User) => {
  //       if (updatedUser) {
  //         this.userService.upsert(user.id, updatedUser).subscribe(() => {
  //           const index = this.users.findIndex((existingUser) => existingUser.id === updatedUser.id);
  //           if (index !== -1) {
  //             this.users[index] = updatedUser;
  //             this.dataSource.data = [...this.users];
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  updateUser(user) {
      this.userService.findById(user.id).subscribe((currentUser: User) => {
      const dialogRef = this.dialog.open(UserDetailsComponent, { data: currentUser });
  
      dialogRef.componentInstance.userUpdated.subscribe((updatedUser: User) => {
        const index = this.users.findIndex((existingUser) => existingUser.id === updatedUser.id);
        if (index !== -1) {
          // this.zone.run(() => {
          //   // Your data update logic here
          //   console.log('Before update:', this.users);
          //   this.users[index] = updatedUser;
          //   this.dataSource.data = [...this.users];
          //   this.loadUsers();
          //   console.log('After update:', this.users);
          //   this.cdr.detectChanges();
          // });
          this.users[index] = updatedUser;
          this.dataSource.data = this.users;
          this.loadUsers();
        }
      });
  
      dialogRef.afterClosed().subscribe((updatedUser: User) => {
        // Optional: Handle additional logic after the dialog is closed
      });
    });
  }
  

  deleteUser(user) {
    this.userService.deleteById(user.id).subscribe(() => {
      this.users = this.users.filter((existingUser) => existingUser.id !== user.id);
      this.dataSource.data = this.users;
    });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }
}
