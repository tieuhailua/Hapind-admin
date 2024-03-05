import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingerComponent } from './singer.component';

const routes: Routes = [
  {
    path: '',
    component: SingerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingerRoutingModule { }
