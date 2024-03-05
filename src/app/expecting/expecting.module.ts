import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpectingRoutingModule } from './expecting-routing.module';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';
import { ExerciseComponent } from '../exercise/exercise.component';
import { ExpectingComponent } from './expecting.component';


@NgModule({
  declarations: [ExpectingComponent],
  imports: [
    CommonModule,
    ExpectingRoutingModule,
    GenericNameTableModule
  ]
})
export class ExpectingModule { }
