import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReasonRoutingModule } from './reason-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { ReasonComponent } from './reason.component';


@NgModule({
  declarations: [ReasonComponent],
  imports: [
    CommonModule,
    ReasonRoutingModule,
    GenericNameTableModule
  ]
})
export class ReasonModule { }
