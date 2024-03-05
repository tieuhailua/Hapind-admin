import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { UserDetailsModule } from '../user/user-details/user-details.module';
import { ReportDetailsComponent } from './report-details/report-details.component';


@NgModule({
  declarations: [
    ReportComponent,
    ReportDetailsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    UserDetailsModule,
  ]
})
export class ReportModule { }
