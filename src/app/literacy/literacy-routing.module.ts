import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiteracyComponent } from './literacy.component';

const routes: Routes = [
  {
    path: '',
    component: LiteracyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiteracyRoutingModule { }
