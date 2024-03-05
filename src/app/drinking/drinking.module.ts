import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrinkingRoutingModule } from './drinking-routing.module';
import { DrinkingComponent } from './drinking.component';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';


@NgModule({
  declarations: [DrinkingComponent],
  imports: [
    CommonModule,
    DrinkingRoutingModule,
    GenericNameTableModule
  ]
})
export class DrinkingModule { }
