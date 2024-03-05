import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmokingComponent } from './smoking.component';

const routes: Routes = [
  {
    path: '',
    component: SmokingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmokingRoutingModule { }
