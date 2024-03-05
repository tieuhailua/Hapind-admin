import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CensorshipRoutingModule } from './censorship-routing.module';
import { CensorshipComponent } from './censorship.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { HighlightModule } from 'src/@fury/shared/highlightjs/highlight.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CensorshipComponent
  ],
  imports: [
    CommonModule,
    CensorshipRoutingModule,
    FormsModule,
    FurySharedModule,
    ReactiveFormsModule,
    MaterialModule,
    // Core
    HighlightModule,
    ScrollbarModule,
    BreadcrumbsModule,
    MatSliderModule,
    MatIconModule
  ]
})
export class CensorshipModule { }
