import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiteracyRoutingModule } from './literacy-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { LiteracyComponent } from './literacy.component';


@NgModule({
  declarations: [LiteracyComponent],
  imports: [
    CommonModule,
    LiteracyRoutingModule,
    GenericNameTableModule
  ]
})
export class LiteracyModule { }
