import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCreateUpdateComponent } from './notification-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCreateUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationCreateUpdateRoutingModule { }
