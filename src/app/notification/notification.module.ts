import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationCreateUpdateComponent } from './notification-create-update/notification-create-update.component';


@NgModule({
  declarations: [
    NotificationCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
