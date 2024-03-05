import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModRoutingModule } from './mod-routing.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module'; 
import { FuryCardModule } from 'src/@fury/shared/card/card.module'; 
import { ModComponent } from './mod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';


@NgModule({
  declarations: [ModComponent],
  imports: [
    CommonModule,
    ModRoutingModule,
    FurySharedModule,
    FuryCardModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ModModule { }
