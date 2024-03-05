import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectingComponent } from './expecting.component';

const routes: Routes = [
  {
    path: '',
    component: ExpectingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpectingRoutingModule { }
