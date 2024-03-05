import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbyRoutingModule } from './hobby-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { HobbyComponent } from './hobby.component';


@NgModule({
  declarations: [HobbyComponent],
  imports: [
    CommonModule,
    HobbyRoutingModule,
    GenericNameTableModule
  ]
})
export class HobbyModule { }
