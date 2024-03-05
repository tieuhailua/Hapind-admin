import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmokingRoutingModule } from './smoking-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { SmokingComponent } from './smoking.component';


@NgModule({
  declarations: [SmokingComponent],
  imports: [
    CommonModule,
    SmokingRoutingModule,
    GenericNameTableModule
  ]
})
export class SmokingModule { }
