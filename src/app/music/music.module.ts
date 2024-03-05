import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { GenericNameTableModule } from '../generic-name-table/generic-name-table.module';


@NgModule({
  declarations: [
    MusicComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    GenericNameTableModule
    
  ]
})
export class MusicModule { }
