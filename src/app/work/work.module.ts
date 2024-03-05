import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { WorkComponent } from './work.component';


@NgModule({
  declarations: [WorkComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    GenericNameTableModule
  ]
})
export class WorkModule { }
