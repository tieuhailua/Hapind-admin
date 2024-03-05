import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';

import { ListColumn } from 'src/@fury/shared/list/list-column.model';

import { GenericNameTableCreateUpdateComponent } from './generic-name-table-create-update/generic-name-table-create-update.component';
import { Table } from './generic-name-table-create-update/generic-name-table.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { GenericNameTableService } from './generic-name-table.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fury-generic-name-table',
  templateUrl: './generic-name-table.component.html',
  styleUrls: ['./generic-name-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class GenericNameTableComponent implements OnInit, AfterViewInit, OnDestroy {
  existingNames: string[] = [];

  @Input() modelName: string;
  furyBreadcrumbsCurrent: string;
  subject$: ReplaySubject<Table[]> = new ReplaySubject<Table[]>(1);
  data$: Observable<Table[]> = this.subject$.asObservable();
  tables: Table[];
  config = 'http://localhost:2203/api';
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Id', property: 'id', visible: true, isModelProperty: true, sortable: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Table> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private dialog: MatDialog, private genericNameTableService: GenericNameTableService, private router: Router, private httpClient: HttpClient) {
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
    this.furyBreadcrumbsCurrent = this.modelName.charAt(0).toUpperCase() + this.modelName.slice(1);
    this.genericNameTableService.modelName = this.modelName;
    console.log('userId is:', this.modelName);
    this.loadTables();
  }

  private loadTables() {
    this.dataSource = new MatTableDataSource<Table>();
    this.genericNameTableService.findAll().subscribe((tables) => {
      this.tables = tables;
      this.dataSource.data = tables;
      this.existingNames = this.tables.map(table => table.name);
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


  createTable() {
    this.dialog.open(GenericNameTableCreateUpdateComponent, { data: { existingNames: this.existingNames, mode: 'create' } }).afterClosed().subscribe((table: Table) => {
      if (table) {
        this.genericNameTableService.create(table).subscribe((createTable) => {
          this.tables.unshift(createTable);
          this.dataSource.data = this.tables;
        });
      }
    });
  }

  updateTable(table) {
    this.genericNameTableService.findById(table.id).subscribe((currentTable: Table) => {
      const dialogRef = this.dialog.open(GenericNameTableCreateUpdateComponent, { data: { existingNames: this.existingNames, mode: 'update', ...currentTable } });

      dialogRef.afterClosed().subscribe((updatedTable: Table) => {
        if (updatedTable) {
          this.genericNameTableService.upsert(table.id, updatedTable).subscribe(() => {
            const index = this.tables.findIndex((existingTable) => existingTable.id === updatedTable.id);
            if (index !== -1) {
              this.tables[index] = updatedTable;
              this.dataSource.data = this.tables;
            }
          });
        }
      });
    });
  }

  deleteTable(table) {
    this.genericNameTableService.deleteById(table.id).subscribe(() => {
      this.tables = this.tables.filter((existingTable) => existingTable.id !== table.id);
      this.dataSource.data = this.tables;
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
