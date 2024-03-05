import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { AdminCreateUpdateComponent } from './admin-create-update/admin-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module'; 
import { ListModule } from 'src/@fury/shared/list/list.module'; 
import { MaterialModule } from 'src/@fury/shared/material-components.module'; 
import { FurySharedModule } from 'src/@fury/fury-shared.module'; 



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    // Core
    ListModule,
    BreadcrumbsModule,
  ],exports: [AdminComponent]
})
export class AdminModule { }
