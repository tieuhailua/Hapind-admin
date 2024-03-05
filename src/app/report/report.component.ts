import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';

import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { ChangeDetectorRef,NgZone  } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReportService } from './report.service'; 
import { Report } from '../model/report';
import { ReportDetailsComponent } from './report-details/report-details.component';

@Component({
  selector: 'fury-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ReportComponent  implements OnInit, AfterViewInit, OnDestroy {
  
  modelName = 'report';

  subject$: ReplaySubject<Report[]> = new ReplaySubject<Report[]>(1);
  data$: Observable<Report[]> = this.subject$.asObservable();
  reports: Report[];

  config = 'http://localhost:2203/api';
  @Input()
  columns: ListColumn[] = [   
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Id', property: 'id', visible: true, isModelProperty: true, sortable: true },
    { name: 'Reason', property: 'reason', visible: true, isModelProperty: true },
    { name: 'Reported', property: 'userByReportedId', visible: true, isModelProperty: true },
    { name: 'Reporter', property: 'userByReporterId', visible: true, isModelProperty: true },
    { name: 'Description', property: 'description', visible: true, isModelProperty: true },
    { name: 'Report Time', property: 'createdAt', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Report> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private dialog: MatDialog, private userService: ReportService, private router: Router, private httpClient: HttpClient,private cdr: ChangeDetectorRef,private zone: NgZone) {
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
    this.dataSource = new MatTableDataSource<Report>();
    this.userService.findAll().subscribe((reports) => {
      this.reports = reports;
      this.dataSource.data = reports;
      
      console.log('OnOpenWeb:', this.reports);
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


  updateUser(report) {
      this.userService.findById(report.id).subscribe((currentUser: Report) => {
      const dialogRef = this.dialog.open(ReportDetailsComponent, { data: currentUser });
  
      dialogRef.componentInstance.userUpdated.subscribe((updatedUser: Report) => {
        const index = this.reports.findIndex((existingUser) => existingUser.id === updatedUser.id);
        if (index !== -1) {
          // this.zone.run(() => {
          //   // Your data update logic here
          //   console.log('Before update:', this.reports);
          //   this.reports[index] = updatedUser;
          //   this.dataSource.data = [...this.reports];
          //   this.loadUsers();
          //   console.log('After update:', this.reports);
          //   this.cdr.detectChanges();
          // });
          this.reports[index] = updatedUser;
          this.dataSource.data = this.reports;
          this.loadUsers();
        }
      });
  
      dialogRef.afterClosed().subscribe((updatedUser: Report) => {
        // Optional: Handle additional logic after the dialog is closed
      });
    });
  }
  

  deleteUser(report) {
    this.userService.deleteById(report.id).subscribe(() => {
      this.reports = this.reports.filter((existingUser) => existingUser.id !== report.id);
      this.dataSource.data = this.reports;
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
