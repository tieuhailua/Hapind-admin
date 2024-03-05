import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailsRoutingModule } from './report-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { HighlightModule } from 'src/@fury/shared/highlightjs/highlight.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatSliderModule } from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportDetailsRoutingModule,
    FormsModule,
    FurySharedModule,
    ReactiveFormsModule,
    MaterialModule,
    // Core
    HighlightModule,
    ScrollbarModule,
    BreadcrumbsModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule, 
    MatListModule,
    MatChipsModule,
    CdkDropList,
    CdkDrag,
    MatButtonToggleModule
  ]
})
export class ReportDetailsModule { }
