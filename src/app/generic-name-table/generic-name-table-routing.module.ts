import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericNameTableComponent } from './generic-name-table.component';

const routes: Routes = [
  {
    path: '',
    component: GenericNameTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericNameTableRoutingModule { }
