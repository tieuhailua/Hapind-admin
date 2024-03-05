import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurposeRoutingModule } from './purpose-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { PurposeComponent } from './purpose.component';


@NgModule({
  declarations: [PurposeComponent],
  imports: [
    CommonModule,
    PurposeRoutingModule,
    GenericNameTableModule
  ]
})
export class PurposeModule { }
