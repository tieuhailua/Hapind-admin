import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family.component';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';


@NgModule({
  declarations: [FamilyComponent],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    GenericNameTableModule
  ]
})
export class FamilyModule { }
