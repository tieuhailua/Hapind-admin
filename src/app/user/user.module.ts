import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module'; 
import { ListModule } from 'src/@fury/shared/list/list.module'; 
import { MaterialModule } from 'src/@fury/shared/material-components.module'; 
import { FurySharedModule } from 'src/@fury/fury-shared.module'; 
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserComponent } from './user.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';



@NgModule({
  declarations: [UserComponent, SendNotificationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    UserDetailsModule,
  ],exports: [UserComponent]
})
export class UserModule { }
