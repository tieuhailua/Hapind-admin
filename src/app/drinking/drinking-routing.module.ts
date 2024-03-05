import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkingComponent } from './drinking.component';

const routes: Routes = [
  {
    path: '',
    component: DrinkingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrinkingRoutingModule { }
