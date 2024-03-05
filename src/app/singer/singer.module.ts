import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingerRoutingModule } from './singer-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { SingerComponent } from './singer.component';


@NgModule({
  declarations: [SingerComponent],
  imports: [
    CommonModule,
    SingerRoutingModule,
    GenericNameTableModule
  ]
})
export class SingerModule { }
