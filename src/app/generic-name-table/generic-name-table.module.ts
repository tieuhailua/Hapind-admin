import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module'; 
import { ListModule } from 'src/@fury/shared/list/list.module'; 
import { MaterialModule } from 'src/@fury/shared/material-components.module'; 
import { FurySharedModule } from 'src/@fury/fury-shared.module'; 
import { GenericNameTableComponent } from './generic-name-table.component';
import { GenericNameTableCreateUpdateModule } from './generic-name-table-create-update/generic-name-table-create-update.module';
import { GenericNameTableRoutingModule } from './generic-name-table-routing.module';


@NgModule({
  declarations: [
    GenericNameTableComponent
  ],
  imports: [
    CommonModule,
    GenericNameTableRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    GenericNameTableCreateUpdateModule,
  ],exports: [GenericNameTableComponent]
})
export class GenericNameTableModule { }
