import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModComponent } from './mod.component';

const routes: Routes = [
  {
    path: '',
    component: ModComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModRoutingModule { }
