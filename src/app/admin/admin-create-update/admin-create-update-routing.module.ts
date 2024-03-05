import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateUpdateComponent } from './admin-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCreateUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCreateUpdateRoutingModule { }
