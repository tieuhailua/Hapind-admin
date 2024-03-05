import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { StatusComponent } from './status.component';



@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    GenericNameTableModule
  ]
})
export class StatusModule { }
